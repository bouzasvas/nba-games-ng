import {Component, OnInit} from '@angular/core';
import {LeagueLeaders} from '../../models/LeagueLeaders/league-leaders';
import {LeagueLeadersService} from '../../services/league-leaders.service';
import {LoaderService} from '../../services/loader.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // From - To Year Const Fields
  private fromYear = '1996';
  private toYear = new Date().getFullYear().toString();

  // Template Filters
  seasonYears: Array<string>;
  seasonTypes: Array<string>;
  playerOrTeam: Array<string>;

  // Selected Template Filters
  selectedSeason: string;
  selectedSeasonType: string;
  selectedPlayerOrTeam: string;

  // Template Data
  leagueLeaders: LeagueLeaders;

  constructor(private leagueLeadersService: LeagueLeadersService, private loader: LoaderService) {
  }

  ngOnInit() {
    this.initTemplateFilterFields();
    this.getLeagueLeaders();
  }

  getLeagueLeaders() {
    this.leagueLeaders = null;
    this.loader.toggleLoader();

    this.leagueLeadersService
      .getLeagueLeaders(this.selectedSeason, this.selectedPlayerOrTeam, this.selectedSeasonType)
      .subscribe(res => {
        this.leagueLeaders = res;

        this.loader.toggleLoader();
      });
  }

  private initTemplateFilterFields(): void {
    this.seasonYears = this.createArrayWithYears(this.fromYear, this.toYear);

    this.seasonTypes = new Array<string>();
    this.seasonTypes.push('Pre Season');
    this.seasonTypes.push('Regular Season');
    this.seasonTypes.push('Playoffs');

    this.playerOrTeam = new Array<string>();
    this.playerOrTeam.push('Player');
    this.playerOrTeam.push('Team');

    // Set Selected Fields
    this.selectedSeason = this.seasonYears[this.seasonYears.length - 1];
    this.selectedSeasonType = 'Regular Season';
    this.selectedPlayerOrTeam = 'Player';
  }

  private createArrayWithYears(fromYear: string, toYear: string): Array<string> {
    const years = _.range(fromYear, toYear)
      .map(year => `${year}-${(year + 1).toString().substr(2)}`);

    return years;
  }
}
