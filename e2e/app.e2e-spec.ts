import { OssecPage } from './app.po';

describe('ossec App', () => {
  let page: OssecPage;

  beforeEach(() => {
    page = new OssecPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
