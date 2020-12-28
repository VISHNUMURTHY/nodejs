import { FieldValidatorsModel } from './filed-validators.model';
import { SelectionsModel } from './selections.model';

export class ElementsModel {
    sequence: number;
    name: string;
    label: string;
    helpText: string;
    type: string;
    validators: FieldValidatorsModel[];
    formatters: string[];
    valueList: SelectionsModel[];
}