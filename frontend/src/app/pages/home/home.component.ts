import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { StorageService } from '../../services/storage.service';
import HumanTimer from 'human-timer';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { ConfigComponent } from 'src/app/components/config/config.component';
import { TimeService } from 'src/app/services/time.service';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [StorageService]
})
export class HomeComponent implements OnInit {

  @Input()
  userTimerConfig;

  @ViewChild('drawerTemplate', { read: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;
  value = 'ng';

  constructor(private drawerService: NzDrawerService, private youtubeService: YoutubeService,
    public storage: StorageService, private timeService: TimeService, private notification: NotificationService,
    private route: Router) { }

  public searchTerm: string = 'Google';
  public videos = [];
  public videosIds = [];
  public loading = false;
  public timerDailyTimer;
  public timerWeekTimer;
  public dailyTimer = 0;
  public weekTimer = 0;
  public playingVideo = false;
  public unblockedVideo = false;
  public totalSearchLenght = 0;
  public currentVideo = 0;
  public userTimeConfig;
  public maxDurationTime = 0;

  ngOnInit() {
    let user = JSON.parse(this.storage.getData('user'));
    if (!user || !user['id']) return this.route.navigate(['./']);
    let userId = user['id']
    this.loadUserTime(userId)
  }

  loadUserTime(userId) {
    this.timeService.getUserTime(userId)
      .then((result: any) => {
        let { segunda, terca, quarta, quinta, sexta, sabado, domingo } = result;
        this.storage.setData('timeConfig', result);
        this.userTimeConfig = result;
        this.updateTimeConfig({ segunda, terca, quarta, quinta, sexta, sabado, domingo })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  updateTimeConfig(data) {
    console.log('calculando')
    let totalWeekTime = 0;

    let highestTime = 0;
    Object.values(data).map(time => {
      highestTime < time ? highestTime = Number(time) : highestTime
      totalWeekTime += Number(time);
    });
    this.maxDurationTime = highestTime;

    let today = new Date().getDay();
    console.log(new Date())

    this.dailyTimer = Number(Object.values(data)[today - 1]);

    this.weekTimer = totalWeekTime;
    this.setTimer();
  }

  setTimer() {
    this.timerDailyTimer = new HumanTimer({
      seconds: this.dailyTimer * 60, // 2 hour long duration
      zeroes: true, // won't turn 5 mins into 05 mins, default is true
      onEnd: () => console.log("END"),
      onTick: () => {
        this.dailyTimer = this.secondsToMinutes(Number(this.timerDailyTimer.hours) * 60 * 60 + Number(this.timerDailyTimer.minutes) * 60 + Number(this.timerDailyTimer.seconds));
      }
    });
    this.timerWeekTimer = new HumanTimer({
      seconds: this.weekTimer * 60, // 4 hour long duration
      zeroes: true, // won't turn 5 mins into 05 mins, default is true
      onEnd: () => console.log("END"),
      onTick: () => {
        this.weekTimer = this.secondsToMinutes(Number(this.timerWeekTimer.hours) * 60 * 60 + Number(this.timerWeekTimer.minutes) * 60 + Number(this.timerWeekTimer.seconds));
      }
    });
  }

  nextVideo(event) {
    if (event === 'next') {
      this.currentVideo++;
    }
    this.userTimeConfig
    this.updateUserTime()
  }

  updateUserTime() {

    let user = JSON.parse(this.storage.getData('user'));

    let today = new Date().getDay();

    let day = Object.keys(this.userTimeConfig)[today - 1];
    this.userTimeConfig[day] = Number(String(this.dailyTimer).replace(',', '.'));

    this.storage.setData('timeConfig', this.userTimeConfig);
    let timeConfig = this.userTimeConfig;
    this.timeService.setUserTime(user['id'], { timeConfig })
      .then(result => {
        this.notification.show('success', `Tempo sincronizado com sucesso`)
      })
      .catch(error => {
        this.notification.show('error', `Não foi possível sincronizar o tempo`);
      })
  }

  search() {
    this.loading = true;
    this.youtubeService.getVideos(this.searchTerm)
      .then((result: any) => {
        this.videos = result.videos;
        this.totalSearchLenght = result.totalMinutes;

        // this.parseVideos(result)
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
      })
  }


  // parseVideos(result) {
  //   this.videos = [];
  //   let total = 0;
  //   result.items.map(video => {
  //     video.duration = this.getVideoDuraion(video.contentDetails.duration);
  //     total += Math.floor(video.duration * 60);
  //     this.videos.push(video);
  //   });
  //   this.totalSearchLenght = this.secondsToMinutes(total);
  // }

  secondsToMinutes(s) { return Number((s - (s %= 60)) / 60 + (9 < s ? '.' : '.') + s) }

  // getVideoDuraion(youTubeVideoDuration) {
  //   let hours = 0;
  //   let minutes = 0;
  //   let seconds = 0;

  //   let duration = youTubeVideoDuration.replace('PT', '');

  //   if (duration.indexOf('H') > -1) {
  //     let hours_split = duration.split('H');
  //     hours = parseInt(hours_split[0]);
  //     duration = hours_split[1];
  //   }

  //   if (duration.indexOf('M') > -1) {
  //     let minutes_split = duration.split('M');
  //     minutes = parseInt(minutes_split[0]);
  //     duration = minutes_split[1];
  //   }

  //   if (duration.indexOf('S') > -1) {
  //     let seconds_split = duration.split('S');
  //     seconds = parseInt(seconds_split[0]);
  //   }

  //   return this.secondsToMinutes((hours * 60 * 60) + (minutes * 60) + (seconds));
  // }

  videoAction(event) {
    switch (event) {
      case 'start':
        this.timerDailyTimer.start();
        this.timerWeekTimer.start();
        this.playingVideo = true;
        break;
      case 'stop':
        this.timerDailyTimer.stop();
        this.timerWeekTimer.stop();
        this.playingVideo = false;
        break;

      default:
        break;
    }
  }

  openTimeConfig(): void {
    const drawerRef = this.drawerService.create<ConfigComponent, { value: string }, string>({
      nzTitle: 'Component',
      nzContent: ConfigComponent,
      nzContentParams: {
        value: this.value
      }
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      this.updateTimeConfig(data)
    });
  }




}
