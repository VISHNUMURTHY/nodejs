import { ElementsModel } from './elements.model';

export class SectionsModel {
    sequence: number;
    name: string;
    type: string;
    colspan: number;
    helpText: string;
    elements: ElementsModel[]
}