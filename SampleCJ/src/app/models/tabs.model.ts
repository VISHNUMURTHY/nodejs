import { SectionsModel } from './sections.model';

export class TabsModel {
    sequence: number;
    name: string;
    helpText: string;
    icon: string;
    sections: SectionsModel[];
}