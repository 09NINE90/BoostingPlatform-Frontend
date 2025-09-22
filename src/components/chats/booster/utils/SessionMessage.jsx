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
          ${streamLink ? `<a href="${streamLink}" target="_blank" rel="noopener noreferrer" style="color: #0878c1; text-decoration: underline">Stream link</a>` : 'No stream link'}
        </div>
          `.trim();
};

export const getSessionFinishMessage = (sessionInfo) => {
    return `
        <div style="
          background-color: #110134;
          border-radius: 8px;
          padding: 12px;
          font-family: Kanit, sans-serif;
          font-weight: 300;
        ">
          <div><strong>Session Finished</strong></div>
          <div>Declared duration: ${sessionInfo.duration} hour${sessionInfo.duration > 1 ? 's' : ''}</div>
          <div>Fact duration: ${sessionInfo.factDuration}</div>
          <div>Progress message: ${sessionInfo.progressMessage}</div>
          <a href="${sessionInfo.imgurLink}" target="_blank" rel="noopener noreferrer" style="color: #0878c1; text-decoration: underline">Imgur link</a>
          ${sessionInfo.streamLink ? `<a href="${sessionInfo.streamLink}" target="_blank" rel="noopener noreferrer" style="color: #0878c1; text-decoration: underline">Stream link</a>` : 'No stream link'}
        </div>
          `.trim();
};