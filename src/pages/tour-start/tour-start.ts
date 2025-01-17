declare var version_akt, shareeLive_conf, version_check_conf;

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray } from 'ionic-angular';

//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
//import { CopriApiProvider } from '../../providers/copri-api/copri-api';
// import for REST provider
import { RestProvider } from '../../providers/rest/rest';

// for mock data
//import { Item } from '../../models/item';
//import { Items } from '../../providers/providers';


@IonicPage()
@Component({
  selector: 'page-tour-start',
  templateUrl: 'tour-start.html',
})
export class TourStartPage {

   currentItems : any;
   raederItems : any;
   stations = [];
   tour_nr_ja=[];
   //tours_ost=[];tours_sued=[];tours_nord=[];tours_tink=[]; //tours_werkstatt=[];
   //tours=[[]]; 
   tours1=[];tours2=[];tours3=[];tours4=[];    
    tours_werkstatt=[];
   stations_out = []; 
   version: string;
   tour_name:string;

   
   //currentItems: Record[] = [];
  loading: any;
    // rest provider
//    users: any;

//getTinkVersion()
    getItems() {
      this.tours_werkstatt['anzahl']=0;
      //for ( let n=1; n<=4; n++ ) { this.tours[n]['anzahl']=0; this.tours[n]['soll']=0; this.tours[n]['miss']=0; }
      this.tours1['anzahl']=0; this.tours2['anzahl']=0; this.tours3['anzahl']=0; this.tours4['anzahl']=0;
      this.tours1['soll']=0;   this.tours2['soll']=0;   this.tours3['soll']=0;   this.tours4['soll']=0;
      this.tours1['miss']=0;   this.tours2['miss']=0;   this.tours3['miss']=0;   this.tours4['miss']=0;
      
      //this.restProvider.console_itc( 'tours: '+ this.tours );
      /*this.tours_ost['anzahl']=0; this.tours_sued['anzahl']=0; this.tours_nord['anzahl']=0; this.tours_tink['anzahl']=0;
      this.tours_ost['soll']=0; this.tours_sued['soll']=0; this.tours_nord['soll']=0; this.tours_tink['soll']=0;
      this.tours_ost['miss']=0; this.tours_sued['miss']=0; this.tours_nord['miss']=0; this.tours_tink['miss']=0;
      */
      // old -tink tours 
      //var tink_soll=2 ;
      //var ost_stationen = ['15','19','20','21','22','23'];
      //var sued_stationen = ['1','3','4','14'];
      //var nord_stationen = ['12','16','17','18','24'];
      //var tink_stationen = ['1','2','3','4','5','6','7','8','9','10','11','12','13'];

      var stationen=[[]]; stationen[1]=[];stationen[2]=[];stationen[3]=[];stationen[4]=[]; 
      
      this.restProvider.getTinkStationen( this.navParams.get('ac') )
      //this.restProvider.getItcStationen()
      .then(data => {
        //this.currentItems = data;
        var result =[];
        for (var key in data) {
          // check if the property/key is defined in the object itself, not in parent
         if (data.hasOwnProperty(key)) {
              result.push(data[key]);            
              //this.restProvider.console_itc( key, Array.of(data[key]));
          }
        } 
        /*
        var keys = Object.keys(data);
        var result = new Array(keys.length);
          for(var i = 0; i < keys.length;i++){
           //keys[i] for key
           result.push(data[keys[i]]);  // for the value
           this.restProvider.console_itc( data[keys[i]]);
          }
         */
//         this.currentItems=result;
let ri=0; // items array leer dann fehler, daher erstmal nur 13 ausgeben
        this.stations =[];
        for (var key in result) {  // alle stationen durchlaufen
               // this.restProvider.console_itc( key, result[key]['station']);
        // in welcher tour nr ist die Station?  tnr=1 , 2, 3, oder 4  
        let tnr="";tnr=result[key]['service_tour'].charAt(result[key]['service_tour'].length - 1);
        if (tnr != '') { 
          stationen[tnr].push(result[key]['station']);  
        }
        let st_ws=''; // station ist werkstatt ( 0 als Zahl am Ende, vorher Zeichen/keine ziffern) --> anzahl der räder?
        if (result[key]['station'].length==1) st_ws=result[key]['station'].charAt(0);
        if (result[key]['station'].length>1 && isNaN(parseInt(result[key]['station'].charAt(result[key]['station'].length - 2)))) st_ws=result[key]['station'].charAt(result[key]['station'].length - 1);
        if (st_ws==this.restProvider.Station_Werkstatt) { this.tours_werkstatt['anzahl']=result[key]['bike_ist']; }
        // station in tour ost? -> hochzählen 'soll'
        if (stationen[1].indexOf(result[key]['station']) != -1  ) this.tours1['soll']=this.tours1['soll']+parseInt(result[key]['bike_soll']);  
        if (stationen[2].indexOf(result[key]['station']) != -1  ) this.tours2['soll']=this.tours2['soll']+parseInt(result[key]['bike_soll']);  
        if (stationen[3].indexOf(result[key]['station']) != -1  ) this.tours3['soll']=this.tours3['soll']+parseInt(result[key]['bike_soll']);  
        if (stationen[4].indexOf(result[key]['station']) != -1  ) this.tours4['soll']=this.tours4['soll']+parseInt(result[key]['bike_soll']);  
        //this.restProvider.console_itc( 'Station in T1: ' + stationen[1].indexOf(result[key]['station']) );         
        //if (tink_stationen.indexOf(result[key]['station']) != -1  ) {
          // gmeischte stationen -> tink räder soll immer 2
          //if (this.navParams.get('id') == 'Tink' ) result[key]['bike_soll']=2;
          //if (this.navParams.get('id') == 'Süd' || this.navParams.get('id') == 'Nord'  ) result[key]['bike_soll']=result[key]['bike_soll']-2;          
          //this.tours_tink['soll']=this.tours_tink['soll']+parseInt(result[key]['bike_soll']);
          //this.tours_tink['soll']=this.tours_tink['soll']+tink_soll;
        //}  
             //                this.stations[result[key]['station']]={0,2,3,4,5};
            //if ( ri<13)
            // 11.5.21 - this.stations[result[key]['station']]= {station:result[key]['station'], group:result[key]['station_group'].replace(',', '-'),soll:result[key]['bike_soll'], miss:0, anzahl:0, defekt:0, todo:0, check:0, okay:0,todo_info:0};
            //let anz_st=0; //if (st_ws==this.restProvider.Station_Werkstatt) anz_st=result[key]['bike_ist']; // anzahl räder in Werkstatt
            this.stations[result[key]['station']]= 
            {uri_operator:result[key]['uri_operator'],station:result[key]['station'], group:'sharee',soll:result[key]['bike_soll'], miss:0, anzahl:0, defekt:0, todo:0, check:0, okay:0,todo_info:0};
            ri=ri+1;                
        }
           
        this.restProvider.console_itc( 'Stationen T1: ' + stationen[1]);
        this.restProvider.console_itc( 'Stationen T2: ' + stationen[2]);
        this.restProvider.console_itc( 'Stationen T3: ' + stationen[3]);
        this.restProvider.console_itc( 'Stationen T4: ' + stationen[4]);
        
                            

            //this.currentItems=result;this.restProvider.console_itc( this.currentItems);
            this.restProvider.console_itc( this.stations);
          });
        
        // alle Raeder laden
        this.restProvider.getTinkRaederAll(this.navParams.get('ac'))
        .then(data2 => {
          var result_raeder =[];
          for (var key in data2) {
            // check if the property/key is defined in the object itself, not in parent
            if (data2.hasOwnProperty(key)) {
                result_raeder.push(data2[key]);            
                this.restProvider.console_itc(  Array.of(data2[key]));
            }
          } 
          // alle Raeder durchlaufen
          for (var key in result_raeder) {
            //this.restProvider.console_itc( key, result_raeder[key]['station']);
//            if (result_raeder[key]['state'] == 'defect' || result_raeder[key]['state'] == 'available' )  
            if ( result_raeder[key]['state'] !== 'occupied')  
            if (this.stations.hasOwnProperty(result_raeder[key]['station'])) {
              this.stations[result_raeder[key]['station']]['anzahl']=this.stations[result_raeder[key]['station']]['anzahl']+1;
              // korrektur anzahl: bei Tour 'Tink' nur Tink Räder, bei Tour 'Süd' und 'Nord' nur Konrad Räder -> zählen
                  /*if ( !(this.navParams.get('id') == 'T2'  && result_raeder[key]['bike_group']=='TINK' ) 
                  &&   !(this.navParams.get('id') == 'T3' && result_raeder[key]['bike_group']=='TINK' ) 
                  &&   !(this.navParams.get('id') == 'T4' && result_raeder[key]['bike_group']=='Konrad') )
                    this.stations[result_raeder[key]['station']]['anzahl']=this.stations[result_raeder[key]['station']]['anzahl']+1;
                  */

                // rad in tour ost? -> hochzählen 'anzahl'
              if (stationen[1].indexOf(result_raeder[key]['station']) != -1 ) this.tours1['anzahl']=this.tours1['anzahl']+1;           
              if (stationen[2].indexOf(result_raeder[key]['station']) != -1 ) this.tours2['anzahl']=this.tours2['anzahl']+1;           
              if (stationen[3].indexOf(result_raeder[key]['station']) != -1 ) this.tours3['anzahl']=this.tours3['anzahl']+1;           
              if (stationen[4].indexOf(result_raeder[key]['station']) != -1 ) this.tours4['anzahl']=this.tours4['anzahl']+1;           
            }
            // if (result_raeder[key]['state'] == 'defect') 
           // if (this.stations.hasOwnProperty(result_raeder[key]['station'])) 
           //       this.stations[result_raeder[key]['station']]['defekt']=this.stations[result_raeder[key]['station']]['defekt']+1;
           if (this.stations.hasOwnProperty(result_raeder[key]['station'])) {
            // rad in tour ost? -> hochzählen 'miss'
             if (stationen[1].indexOf(result_raeder[key]['station']) != -1  ) this.tours1['miss']=this.tours1['soll']-this.tours1['anzahl'];           
             if (stationen[2].indexOf(result_raeder[key]['station']) != -1  ) this.tours2['miss']=this.tours2['soll']-this.tours2['anzahl'];
             if (stationen[3].indexOf(result_raeder[key]['station']) != -1  ) this.tours3['miss']=this.tours3['soll']-this.tours3['anzahl'];           
             if (stationen[4].indexOf(result_raeder[key]['station']) != -1  ) this.tours4['miss']=this.tours4['soll']-this.tours4['anzahl'];    
          }
           
            // defekt
            if ( result_raeder[key]['service_state'] == '1' )  
            if (this.stations.hasOwnProperty(result_raeder[key]['station'])) 
                    this.stations[result_raeder[key]['station']]['defekt']=this.stations[result_raeder[key]['station']]['defekt']+1;
            // todo
            if ( result_raeder[key]['service_state'] == '2' )  
            if (this.stations.hasOwnProperty(result_raeder[key]['station'])) 
                    this.stations[result_raeder[key]['station']]['todo']=this.stations[result_raeder[key]['station']]['todo']+1;
            // check
            if ( result_raeder[key]['service_state'] == '3' )  
            if (this.stations.hasOwnProperty(result_raeder[key]['station'])) 
                    this.stations[result_raeder[key]['station']]['check']=this.stations[result_raeder[key]['station']]['check']+1;
            // okay
            if ( result_raeder[key]['service_state'] == '0' && result_raeder[key]['state'] !== 'occupied'  )  
            if (this.stations.hasOwnProperty(result_raeder[key]['station'])) 
                    this.stations[result_raeder[key]['station']]['okay']=this.stations[result_raeder[key]['station']]['okay']+1;
            // todo_info
            if ( result_raeder[key]['todo_info'] == '1' && result_raeder[key]['state'] !== 'occupied'  )  
            if (this.stations.hasOwnProperty(result_raeder[key]['station'])) 
                    this.stations[result_raeder[key]['station']]['todo_info']=1;

      
                  //this.restProvider.console_itc(Array.of(result[key]).push(['zahl','111']));
          }
           
          this.stations_out =[];
      
          var tour_start=[];
          if (this.navParams.get('id') == 'T1' ) tour_start=stationen[1];
          else if (this.navParams.get('id') == 'T2' ) tour_start=stationen[2];
          else if (this.navParams.get('id') == 'T3' ) tour_start=stationen[3];
          else if (this.navParams.get('id') == 'T4' ) tour_start=stationen[4];
          else       tour_start=['999'];
              
          
          //if (data.hasOwnProperty(key) && tour_start.indexOf(data[key]['station']) != -1 ) {
          //    result.push(data[key]);            
          
      
          for (var key in this.stations) {
          // check if station is on tour, otherwise do not show it
          if (this.stations.hasOwnProperty(key) && (tour_start.indexOf(this.stations[key]['station']) != -1 || tour_start.indexOf('999') != -1) ) {
              // soll Korrektur:  Tour 'Tink' tink_soll
              // if (this.navParams.get('id') == 'T4' ) this.stations[key]['soll']=tink_soll;

              //this.restProvider.console_itc( tink_stationen.indexOf(result_raeder[key]['station']) );

             //if ((this.navParams.get('id') == 'T2' || this.navParams.get('id') == 'T3')  && tink_stationen.indexOf(this.stations[key]['station']) != -1  ) 
               // this.stations[key]['soll']=this.stations[key]['soll']-tink_soll;
             
             this.stations[key]['miss']=this.stations[key]['soll']-this.stations[key]['anzahl'];
 
             this.stations_out.push(this.stations[key]);   
             window.localStorage.setItem('uri_operator',this.stations[key]['uri_operator']);
             
            }
          } 
          /* not used anymoree
          function itc_sort_miss(b,a){
            // return a['work_id'].localeCompare(b['work_id']);
            let comparison = 0;
            if (a['miss'] >= b['miss']) { comparison = 1;
              } else { comparison=-1;   }
            return comparison; 
          } */
          function itc_sort_station(b,a){
            let comparison = 0;
            if (a['station'] <= b['station']) { comparison = 1;}  else { comparison=-1;   }
            return comparison;
          } 
     
    this.currentItems=this.stations_out.sort(itc_sort_station); //this.stations_out; // sorting stop - this.stations_out.sort(itc_sort_station);
    this.raederItems=result_raeder;
//            this.currentItems=result_raeder;
//            this.restProvider.console_itc( this.raederItems);            
            this.restProvider.console_itc('sort-items '+ this.currentItems);
            if (this.tours1['anzahl']!=0 || this.tours1['soll']!=0 || this.tours1['miss']!=0) this.tour_nr_ja[1]='ja'; else this.tour_nr_ja[1]='';
            if (this.tours2['anzahl']!=0 || this.tours2['soll']!=0 || this.tours2['miss']!=0) this.tour_nr_ja[2]='ja'; else this.tour_nr_ja[2]='';
            if (this.tours3['anzahl']!=0 || this.tours3['soll']!=0 || this.tours3['miss']!=0) this.tour_nr_ja[3]='ja'; else this.tour_nr_ja[3]='';
            if (this.tours4['anzahl']!=0 || this.tours4['soll']!=0 || this.tours4['miss']!=0) this.tour_nr_ja[4]='ja'; else this.tour_nr_ja[4]='';
          });
    }

    constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
      //currentItems = new Array<Record>();
      //this.version='12';
    }
    loadStations() {
      //this.restProvider.console_itc('ionViewDidLoad tour_stationenPage');
      if(!window.localStorage.getItem('authcookie')) this.navCtrl.push('LoginPage');
      this.getItems();
      //this.ionViewDidLoad();
    }
    ionViewDidLoad() {
      this.restProvider.console_itc('ionViewDidLoad tour_stationenPage');
      if(!window.localStorage.getItem('authcookie')) this.navCtrl.push('LoginPage');
      this.getItems();
    
      // check version --> autom. Update auf Neueste Version
      this.restProvider.getShareeVersion()
      .then(data => {
        this.version = data['version']; //neuste Version
        
        this.restProvider.console_itc('version_akt='+version_akt);
        this.restProvider.console_itc('this.version='+this.version);
        function wait_ms(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }

        if (( version_akt != this.version ) && version_check_conf == "JA") {
          this.restProvider.UpdateAktVersion(this.version);
          wait_ms(5000).then(() => { window.location.href = shareeLive_conf +'/sharee_'+this.version;  });
        }
      });
      
    }
    ionViewWillEnter() {
      //this.restProvider.console_itc('ionViewWillenter tour_stationenPage');
      //this.getItems();
      this.tour_name = this.navParams.get('id');
      this.restProvider.console_itc('navparam-id='+this.navParams.get('id'));
    }

    goToTourStart(id: string){
      if (!id) id = "";
      this.navCtrl.push('TourStartPage',{'id':id,'ac':this.navParams.get('ac')});
    }
//  
goToStationRadliste(id: string){
  if (!id) id = "";
  this.navCtrl.push('StationRadlistePage',{'id':id,'ac':this.navParams.get('ac')});
}
//    goToStationRadliste(params){
//      if (!params) params = {};
//      this.navCtrl.push('StationRadlistePage',{params});
//    }
    reorderItems(indexes) {
      this.currentItems = reorderArray(this.currentItems, indexes);
    }

    getNeueVersion() {  
      this.restProvider.getShareeVersion()
        .then(data => {
          this.version = data['version'];
        });
    }      

    LogOut() {  
      window.localStorage.setItem('authcookie','');
      this.navCtrl.push('LoginPage');

    }      
    
    
//      reorderItems(indexes) {
//      this.users = reorderArray(this.users, indexes);
//    }
  //-----------------------
  
/*
  currentItems: Item[];

  constructor(public navCtrl: NavController, public items: Items) {
  }

  reorderItems(indexes) {
    this.currentItems = reorderArray(this.currentItems, indexes);
  }
  
  ionViewDidLoad() {
    this.restProvider.console_itc('ionViewDidLoad Mockdata tour_stationenPage');
    this.currentItems = this.items.query().sort();
  }
*/



 /*
  // rest provider
  users: any;
  getItems() {
    this.restProvider.getUsers()
    .then(data => {
      this.users = data;
      this.restProvider.console_itc(this.users);
    });
  }
  constructor(public navCtrl: NavController, public restProvider: RestProvider) {
  }
  reorderItems(indexes) {
    this.users = reorderArray(this.users, indexes);
  }
  ionViewDidLoad() {
    this.restProvider.console_itc('ionViewDidLoad tour_stationenPage');
    this.getItems();
  }
//-----------------------
*/

 
  
  
  /*
  stationen: Observable <any>;
  title: String;
  constructor(public navCtrl: NavController, public navParams: NavParams, public copriAPI: CopriApiProvider) {
     this.stationen = copriAPI.getStationen();

    //this.title = 'test'; //this.stationen['Search'][0]['Title'];
      //this.restProvider.console_itc(this.title);
      
      //  this.stationen = Array.of(this.copriAPI.getStationen());
      
    //this.stationen=Array.of(this.stationen_o);
    //this.stationen =this.stat[0][0];
    }
*/
  

  

}
