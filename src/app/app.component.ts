import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  formMessage = new FormControl('', [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]);

  width = 280;
  height = 300;
  isVisible = false;
  isEmojiPickerVisible = false;
  messages: string[] = [];

  send(): void {
    if (this.formMessage.invalid) {
      return;
    }

    this.messages.push(this.formMessage.value);
    this.formMessage.reset();
  }

  addEmoji(event: any): void {
    const text = `${this.formMessage.value ? this.formMessage.value : ''}${event.emoji.native}`;
    this.formMessage.setValue(text);
  }

}
