import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";

import {Config} from "../models/config/config";


@Injectable({providedIn: 'root'})
export class ConfigService {
  private _config: Config|null = null;

  public constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  public loadConfig(): Promise<Config> {
    const $config = this.httpClient.get<Config>('/config.json');

    return lastValueFrom($config).then(
      (config) => this._config = config,
      (error) => {throw new Error(`Could not load config: ${error.message}`)}
    );
  }

  public get config(): Config {
    if (!this._config) {
      throw new Error('Config not loaded yet');
    }

    return this._config;
  }
}
