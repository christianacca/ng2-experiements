import { TempNg2Page } from './app.po';

describe('temp-ng2 App', function() {
  let page: TempNg2Page;

  beforeEach(() => {
    page = new TempNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
