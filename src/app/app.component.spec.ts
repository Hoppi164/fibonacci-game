import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'fibonacci-game'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('fibonacci-game');
  });

  it('should render page', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#playTitle')?.textContent).toContain('Play The Fibonacci Game');
  });

  it('should alert when fib number is entered', () => {
    const fixture = TestBed.createComponent(AppComponent);
    spyOn(window, 'alert');
    fixture.detectChanges();

    const inputField = fixture.debugElement.query(By.css('#userNumberInput'));
    inputField.nativeElement.value = '3';
    inputField.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('#submitButton'));
    submitButton.triggerEventHandler('click', null);

    expect(window.alert).toHaveBeenCalledWith('FIB');
  });

  it('should not alert when non-fib number is entered', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    spyOn(window, 'alert');
    fixture.detectChanges();

    const inputField = fixture.debugElement.query(By.css('#userNumberInput'));
    inputField.nativeElement.value = '4';
    inputField.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('#submitButton'));
    submitButton.triggerEventHandler('click', null);

    expect(window.alert).not.toHaveBeenCalledWith('FIB');
  });

});
