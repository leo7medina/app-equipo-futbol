import { TestBed } from '@angular/core/testing';

import { Player.ServiceService } from './player.service.service';

describe('Player.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Player.ServiceService = TestBed.get(Player.ServiceService);
    expect(service).toBeTruthy();
  });
});
