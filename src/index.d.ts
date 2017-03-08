/// <reference path="../node_modules/@types/webpack/index.d.ts" />
import * as wp from 'webpack'

export interface WFSConfigInterface extends wp.Configuration {
  client: wp.Configuration,
  server?: wp.Configuration
}

export interface NodeRequire {
   ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
}
