import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import {plugin, databaseTypes} from './data';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'codemirror/mode/xml/xml.js';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form;
  output     = plugin;
  selectData  = [
      {key: 'yes', val: 'да'},
      {key: 'no', val: 'нет'}
  ];
  databaseTypes = databaseTypes;
  code = '';

    constructor(private formBuilder: FormBuilder, private http: Http) {

        this.dataHandler(this.output);

        this.form = formBuilder.group(plugin);

        this.form.valueChanges.subscribe(data => {
            this.output = data;
            this.getFile(data);
        });
  }

  dataHandler(output = plugin) {
      let returner = `
          <ossec_config>
            <global>
              <email_notification>${output.email_notification}</email_notification>
              <email_to>${output.email_to}</email_to>
              <smtp_server>${output.smtp_server}</smtp_server>
              <email_from>${output.email_from}</email_from> 
              <email_maxperhour>${output.email_maxperhour}</email_maxperhour>
            </global>
            <syscheck>
              <frequency>${output.frequency}</frequency>                                              
              <directories check_all="yes">${output.directories}</directories>                             
              <ignore>${output.ignore}</ignore>               
              <scan_time>${output.scan_time}</scan_time>               
              <scan_on_start>${output.scan_on_start}</scan_on_start>               
              <alert_new_files>${output.alert_new_files}</alert_new_files>               
           </syscheck>
           <database_output>
               <hostname>${output.hostname}</hostname>
               <username>${output.username}</username>
               <database>${output.database}</database>
               <database>${output.type}</database>
           </database_output>
           <rootcheck>
                <rootkit_files>${output.rootkit_files}</rootkit_files>
                <rootkit_trojans>${output.rootkit_trojans}</rootkit_trojans>`;
      const audits = output.system_audit.split(', ');
      if (audits.length) {
        for (const audit of audits) {
          returner += `<system_audit>/var/ossec/etc/shared/${audit}</system_audit>`;
        }
      }
      returner += `
            </rootcheck>
          </ossec_config>
      `;

      this.code = returner;

      return returner;
  }

   public getFile(data) {
       data = this.dataHandler(data);
       const bodyString = JSON.stringify(data); // Stringify payload
       const headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
       const options       = new RequestOptions({ headers: headers }); // Create a request option
       this.http.post('http://localhost:3000/file', {
           filename: 'ossec.conf',
           content: data
       }, options) // ...using post request
           .map(res => res.json()) // ...and calling .json() on the response to return data
           .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
           .subscribe();
   }

  ngOnInit() {
  }

}
