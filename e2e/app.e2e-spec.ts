import { Ng2ExperiementsPage } from './app.po';

describe('ng2-experiements App', function() {
  let page: Ng2ExperiementsPage;

  beforeEach(() => {
    page = new Ng2ExperiementsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
