export const getSessionStartMessage = (duration, streamLink, dateStart) => {
    return `
        <div style="
          background-color: #110134;
          border-radius: 8px;
          padding: 12px;
          font-family: Kanit, sans-serif;
          font-weight: 300;
        ">
          <div><strong>Session Started</strong></div>
          <div>UTC date time start: ${dateStart}</div>
          <div>Duration: ${duration} hour${duration > 1 ? 's' : ''}</div>
          ${streamLink ? `<a href="${streamLink}" target="_blank" style="color: #0878c1; text-decoration: underline">Stream link</a>` : 'No stream link'}
        </div>
          `.trim();
};


