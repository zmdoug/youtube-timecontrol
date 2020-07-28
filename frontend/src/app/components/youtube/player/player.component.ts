import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit {

  constructor(private notification: NotificationService) { }

  @ViewChild('player') player: any;
  videoId: string;

  @Input()
  video;

  @Input()
  currentVideo;

  @Input()
  dailyTimer;

  @Output() videoAction = new EventEmitter<string>();
  @Output() nextVideo = new EventEmitter<string>();

  public visible = true;

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  // Autoplay
  onReady() {
    this.player.mute();
    // this.player.playVideo();
  }

  unblockVideo() {
    if (!this.currentVideo) {
      return this.notification.show('error', `Por favor assista os vídeos na sequência`);
    }
    if (this.dailyTimer < this.video.duration) {
      return this.notification.show('error', `Você não pode assistir este vídeo hoje porque seu tempo não permite.`)
    }
    this.visible = !this.visible;
  }

  // Loop
  onStateChange(event) {
    switch (event.data) {
      case 0:
        this.videoAction.emit('stop');
        this.nextVideo.emit('next')
        break;
      case 1:
        if (this.dailyTimer < this.video.duration) {
          this.videoAction.emit('stop');
          return this.notification.show('error', `Você não pode assistir este vídeo hoje porque seu tempo não permite.`)
        }
        this.videoAction.emit('start');
        break;
      case 2:
        this.videoAction.emit('stop');
        this.visible = !this.visible;
        break;

      default:
        break;
    }
  }
}
