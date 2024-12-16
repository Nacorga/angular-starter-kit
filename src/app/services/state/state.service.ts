import { Injectable, computed, signal } from '@angular/core';
import { DEFAULT_LANG } from '@app/constants/lang.constants';
import { State } from '@app/interfaces/state.interface';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private readonly _state = signal<State>({
    currentLang: DEFAULT_LANG,
    layout: null,
    loader: false,
    user: null,
  });

  readonly state = {
    currentLang: computed(() => this._state().currentLang),
    layout: computed(() => this._state().layout),
    loader: computed(() => this._state().loader),
    user: computed(() => this._state().user),
  };

  update<T>(key: keyof State, value: T) {
    this._state.update((state) => ({ ...state, [key]: value as any }));
  }

  reset() {
    this.update('user', null);
  }
}
