import mixpanel from 'mixpanel-browser';

function mixpanelTrack (title, options) {
  if(process.env.NODE_ENV === "production") {
    mixpanel.init(
      process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN, 
      { debug: false }
    );

    mixpanel.track(title, options);
  }
}


export { mixpanelTrack }