import { ZTimesheetPage } from './app.po';

describe('z-timesheet App', () => {
  let page: ZTimesheetPage;

  beforeEach(() => {
    page = new ZTimesheetPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
