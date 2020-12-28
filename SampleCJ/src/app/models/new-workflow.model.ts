import { TabsModel } from './tabs.model';

export class NewWorkFlowModel {
  name: string;
  startDate: Date;
  endDate: Date;
  tabs: TabsModel[];
}