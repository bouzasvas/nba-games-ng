import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameStatsService} from '../../services/game-stats.service';
import {GameStats} from '../../models/TeamStats/game-stats';
import {LoaderService} from '../../services/loader.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {

  gameDate: string;

  gameId: string;
  gameStats: GameStats;

  constructor(private route: ActivatedRoute,
              private title: Title,
              private gameStatsService: GameStatsService,
              public loader: LoaderService) {
  }

  ngOnInit() {
    // Get Game Date from URL
    this.gameDate = this.route.snapshot.queryParamMap.get('gameDate');

    this.gameId = this.route.snapshot.paramMap.get('id');
    this.getGameStats();
  }

  getGameStats() {
    this.loader.toggleLoader();

    this.gameStatsService.getGameStats(this.gameId)
      .subscribe(stats => {
        this.gameStats = stats;
        this.title.setTitle(`NBA Stats - ${this.gameStats.homeTeamStats.team.fullName} vs ${this.gameStats.awayTeamStats.team.fullName} Game Details`);

        this.loader.toggleLoader();
      });
  }

}
