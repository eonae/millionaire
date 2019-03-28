module.exports = {

  serialize(obj) {
    const result = Object.assign({}, obj);
    stripCorrect(result);

    return JSON.stringify(result);
  },

  createReport(session) {
    const report = Object.assign({}, session.game);
    report.player = session.player;

    stripCorrect(report);

    return JSON.stringify(report);
  }
}

function stripCorrect(obj) {
  if (obj.correct !== undefined) delete obj.correct;
}