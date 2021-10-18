import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { AngularDraggableModule } from 'angular2-draggable';

import { AppComponent } from './app.component';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        ReactiveFormsModule,
        AngularDraggableModule,
        PickerModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    component.isVisible = true;
    component.isEmojiPickerVisible = true;
    component.messages = ['message1'];
    component.formMessage.setValue('message2');

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should contain tags', () => {
    element = fixture.nativeElement;
    expect(element.innerHTML).toContain('input');
    expect(element.innerHTML).toContain('button');
    expect(element.innerHTML).toContain('i');
    expect(element.innerHTML).toContain('emoji-mart');
  });

  it('should contain "Чат"', () => {
    element = fixture.nativeElement.querySelector('h2');
    expect(element.textContent).toContain('Чат');
  });

  it('should contain "message 1"', () => {
    element = fixture.nativeElement.querySelector('p');
    expect(element.textContent).toContain('message1');
  });

  it('press Enter should call send()', () => {
    spyOn(component, 'send');

    const keyBoardEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    element = fixture.nativeElement.querySelector('input');
    element.dispatchEvent(keyBoardEvent);

    expect(component.send).toHaveBeenCalledTimes(1);
  });

  it('should call send()', () => {
    spyOn(component, 'send');

    element = fixture.nativeElement.querySelector('button');
    element.click();

    expect(component.send).toHaveBeenCalledTimes(1);
  });

  it('formMessage should be truthy', () => {
    expect(component.formMessage).toBeTruthy();
  });

  it('width should be 280', () => {
    expect(component.width).toBe(280);
  });

  it('height should be 300', () => {
    expect(component.height).toBe(300);
  });

  it('send() should add message into messages and reset form', () => {
    component.send();

    expect(component.messages.length).toBe(2);
    expect(component.messages[1]).toBe('message2');
    expect(component.formMessage.value).toBeNull();
  });

  it('addEmoji() should call formMessage setValue()', () => {
    spyOn(component.formMessage, 'setValue');

    component.addEmoji({
      $event: new PointerEvent(''),
      emoji: { native: '😊' }
    });

    expect(component.formMessage.setValue).toHaveBeenCalledTimes(1);
  });
});
