import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-field-list',
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.scss'],
})
export class FieldListComponent {
  @Input() fields: any[] = [];
  @Input() canUpdate: any;
  updatedField: any;
  isUpdateFieldVisible: boolean = false;

  openUpdate(item: any) {
    this.isUpdateFieldVisible = true;
    this.updatedField = item;
  }

  closeModal(bool: boolean) {
    this.isUpdateFieldVisible = bool;
  }

  setNewField(field: any) {
    const index = this.fields.findIndex((f: any) => f.id == field.id);
    this.fields[index] = field;
  }
}
