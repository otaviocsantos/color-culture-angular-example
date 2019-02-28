import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MiniPickerComponent } from './mini-picker/mini-picker.component';
import { ExampleComponent } from './example/example.component';
import { SampleComponent } from './sample/sample.component';
import { CultureComponent } from './culture/culture.component';

@NgModule({
  declarations: [
    AppComponent,
    MiniPickerComponent,
    ExampleComponent,
    SampleComponent,
    CultureComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
