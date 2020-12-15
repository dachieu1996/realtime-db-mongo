import { AddressSelectComponent } from './selects/address-select/address-select.component';
import { ImageUploadComponent } from './upload/image-upload/image-upload.component';
import { ModalComponent } from './modals/modal/modal.component';
import { InputPriceComponent } from './inputs/input-price/input-price.component';
import { DndUploadComponent } from './upload/dnd-upload/dnd-upload.component';
import { InputTextComponent } from './inputs/input-text/input-text.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SwitchComponent } from './switch/switch.component';
import { SelectComponent } from './selects/select/select.component';
import { ButtonPrevComponent } from './buttons/button-prev/button-prev.component';
import { ButtonNextComponent } from './buttons/button-next/button-next.component';
import { TagComponent } from './tag/tag.component';
import { ButtonDeleteComponent } from './buttons/button-delete/button-delete.component';
import { ButtonEditComponent } from './buttons/button-edit/button-edit.component';
import { ButtonReloadComponent } from './buttons/button-reload/button-reload.component';
import { ButtonCreateComponent } from './buttons/button-create/button-create.component';
import { ButtonBackComponent } from './buttons/button-back/button-back.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { LabelKibanaComponent } from './labels/label-kibana/label-kibana.component';
import { ButtonSaveComponent } from './buttons/button-save/button-save.component';
import { ButtonCancelComponent } from './buttons/button-cancel/button-cancel.component';
import { LabelVerticalComponent } from './labels/label-vertical/label-vertical.component';
import { LabelHorizontalComponent } from './labels/label-horizontal/label-horizontal.component';
import { TitleHearderLayoutComponent } from './title/title-hearder-layout/title-hearder-layout.component';
import { ButtonDetailComponent } from './buttons/button-detail/button-detail.component';
import { ButtonSearchComponent } from './buttons/button-search/button-search.component';
import { ButtonBaseComponent } from './buttons/button-base/button-base.component';
import { TextareaComponent } from './textarea/textarea.component';
import { InputTextareaComponent } from './inputs/input-textarea/input-textarea.component';
import { OnOffComponent } from './on-off/on-off.component';
import { InputNumberComponent } from './inputs/input-number/input-number.component';
import { InputEmailComponent } from './inputs/input-email/input-email.component';
import { RateComponent } from './rate/rate.component';
import { DatePickerTimeComponent } from './date/date-picker-time/date-picker-time.component';
import { DatePickerComponent } from './date/date-picker/date-picker.component';
import { RadioComponent } from './radio/radio.component';
import { ButtonSendComponent } from './buttons/button-send/button-send.component';
@NgModule({
  declarations: [
    OnOffComponent,
    LabelVerticalComponent,
    LabelKibanaComponent,
    LabelHorizontalComponent,
    OnOffComponent,
    InputTextComponent,
    ButtonCreateComponent,
    ButtonReloadComponent,
    ButtonEditComponent,
    ButtonDeleteComponent,
    ButtonSaveComponent,
    ButtonCancelComponent,
    ButtonSaveComponent,
    ButtonCancelComponent,
    ButtonBackComponent,
    ButtonBaseComponent,
    ButtonPrevComponent,
    SwitchComponent,
    CheckboxComponent,
    SelectComponent,
    TitleHearderLayoutComponent,
    ButtonDetailComponent,
    ButtonSearchComponent,
    DatePickerComponent,
    TagComponent,
    ButtonNextComponent,
    TextareaComponent,
    InputTextareaComponent,
    InputNumberComponent,
    InputEmailComponent,
    RateComponent,
    DatePickerTimeComponent,
    RadioComponent,
    ButtonSendComponent,
    DndUploadComponent,
    InputPriceComponent,
    ModalComponent,
    ImageUploadComponent,
    AddressSelectComponent
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    OnOffComponent,
    LabelVerticalComponent,
    LabelKibanaComponent,
    LabelHorizontalComponent,
    OnOffComponent,
    InputTextComponent,
    ButtonCreateComponent,
    ButtonReloadComponent,
    ButtonEditComponent,
    ButtonDeleteComponent,
    ButtonSaveComponent,
    ButtonCancelComponent,
    ButtonBackComponent,
    ButtonSendComponent,
    ButtonBaseComponent,
    ButtonPrevComponent,
    SwitchComponent,
    CheckboxComponent,
    SelectComponent,
    DatePickerComponent,
    TitleHearderLayoutComponent,
    ButtonDetailComponent,
    ButtonSearchComponent,
    TagComponent,
    ButtonNextComponent,
    TextareaComponent,
    InputTextareaComponent,
    InputNumberComponent,
    InputEmailComponent,
    RateComponent,
    DatePickerTimeComponent,
    RadioComponent,
    DndUploadComponent,
    InputPriceComponent,
    ModalComponent,
    ImageUploadComponent,
    AddressSelectComponent
  ]
})
export class ComponentsModule { }
