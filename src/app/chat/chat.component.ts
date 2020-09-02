import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

export interface messages {
  message: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  width: number = 280;
  height: number = 300;
  messages: messages[] = [];
  formMessage: any;
  isVisible = false;

  ngOnInit() {
    this.formMessage = new FormGroup({
      message: new FormControl('', [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')])
    });
  }

  send() {
    if (this.formMessage.invalid) {
      return;
    }
    this.messages.push(this.formMessage.value);
    this.formMessage.reset();
  }

}
