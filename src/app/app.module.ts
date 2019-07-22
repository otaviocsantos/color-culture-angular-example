import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SampleComponent } from './sample/sample.component';
import { MiniPickerComponent } from './mini-picker/mini-picker.component';
import { ColorFunctionsComponent } from './color-functions/color-functions.component';
import { ExampleComponent } from './example/example.component';
import { CultureComponent } from './culture/culture.component';

@NgModule({
  declarations: [
    AppComponent,
    SampleComponent,
    MiniPickerComponent,
    ColorFunctionsComponent,
    ExampleComponent,
    CultureComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
