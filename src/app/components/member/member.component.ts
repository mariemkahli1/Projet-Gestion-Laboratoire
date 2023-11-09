import { Component } from '@angular/core';
import { GLOBAL } from 'src/app/app-config';
import { Member } from 'src/models/member';


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {
  dataSource: Member[] = GLOBAL._DB.membres
  displayedColumns: string[] = ['id', 'cin', 'name', 'cv', 'type', 'createdDate','action'];

}
