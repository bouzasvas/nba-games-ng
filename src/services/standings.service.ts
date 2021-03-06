import {Injectable} from '@angular/core';
import {AppConstants} from '../common/app-constants';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StandingsPerTeam} from '../models/Standings/standings';
import {map} from 'rxjs/operators';
import {StandingsMapper} from '../models/Standings/standings-mapper';
import {Utils} from '../common/utils';
import {BaseCallerService} from './base-caller.service';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {

  private serviceEndpoint = `${AppConstants.baseNbaApiUrl}/leaguestandings`;

  constructor(private api: BaseCallerService) {
  }

  getTodayStandings(): Observable<Array<StandingsPerTeam>> {
    const endpoint = `${this.serviceEndpoint}?LeagueID=00&Season=${Utils.getCurrentSeasonYear()}&SeasonType=Regular+Season`;

    return this.api
      .apiCall<Array<StandingsPerTeam>>(endpoint)
      .pipe(
        // TODO: Handle Error
        map(response => StandingsMapper.mapResponseToStandingsArray(response))
      );
  }

  getStandingsBySeasonYearAndType(year: string, type = 'Regular Season'): Observable<Array<StandingsPerTeam>> {
    // const serviceEndpointParams: HttpParams = new HttpParams();
    // serviceEndpointParams
    //   .set('LeagueID', '00')
    //   .set('Season', year)
    //   .set('SeasonType', type);

    return this.api
      .apiCall<Array<StandingsPerTeam>>(`${this.serviceEndpoint}?LeagueID=00&SeasonType=${type}&Season=${year}`)
      // .get<Array<StandingsPerTeam>>(this.serviceEndpoint, {params: serviceEndpointParams})
      .pipe(
        map(response => StandingsMapper.mapResponseToStandingsArray(response))
      );
  }
}
