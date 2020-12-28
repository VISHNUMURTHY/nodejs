import { Component, OnInit, Input } from '@angular/core';
import { SectionsModel } from '../models/sections.model';
import { SortPipe } from '../shared/pipes/sort.pipe';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
  step = 0;
  
  @Input()
  questionnaireData: SectionsModel[] = [];

  @Input()
  questionnaireForm: FormGroup = new FormGroup({});

  constructor(private sort: SortPipe) { }

  ngOnInit(): void {
    this.questionnaireData = this.sort.transform(this.questionnaireData, 'asc','sequence');
    console.log("Questionnaire ", this.questionnaireForm);
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
