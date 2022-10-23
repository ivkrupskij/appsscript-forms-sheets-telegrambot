const BOT_ID = "";
const BOT_TOKEN = "";
const TARGET_CHAT_ID = "";

function SendToTelegram(message) {
  const endpoint = `https://api.telegram.org/bot${BOT_ID}:${BOT_TOKEN}/sendMessage`;
  const data = {
    chat_id: TARGET_CHAT_ID,
    text: message,
  };
  const options = {
    method: "post",
    payload: data,
  };

  const response = UrlFetchApp.fetch(endpoint, options);
}

function GetNumberOfAnswers() {
  const SHEET_NAME = "Scripting";
  var NumberOfAnswers = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(SHEET_NAME)
    .getRange(1, 2)
    .getValue();
  return NumberOfAnswers;
}
function GetNumberOfPosts() {
  const SHEET_NAME = "Scripting";
  var NumberOfPosts = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(SHEET_NAME)
    .getRange(2, 2)
    .getValue();
  return NumberOfPosts;
}
function GetTheMessage(MessageNumber) {
  var RealMessageNumber = MessageNumber;
  const SHEET_NAME = "Answers";
  var Answer1 = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(SHEET_NAME)
    .getRange(MessageNumber, 2)
    .getValue();
  var Answer2 = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(SHEET_NAME)
    .getRange(MessageNumber, 3)
    .getValue();
  var Answer3 = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(SHEET_NAME)
    .getRange(MessageNumber, 4)
    .getValue();
  var NewMessage = Answer1 + Answer2 + Answer3;
  return NewMessage;
}
function UpdateNumberOfPosts(NewNumberOfPosts) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Scripting");
  var cell = sheet.getRange(2, 2);
  cell.setValue(NewNumberOfPosts);
}
function CheckForUpdates() {
  var NumberOfAnswers = GetNumberOfAnswers();
  var NumberOfPosts = GetNumberOfPosts();
  var DifBetweenPostsAndAnswers = NumberOfAnswers - NumberOfPosts;
  while (DifBetweenPostsAndAnswers != 0) {
    NumberOfPosts = NumberOfPosts + 1;
    UpdateNumberOfPosts(NumberOfPosts);
    var DifBetweenPostsAndAnswers = NumberOfAnswers - NumberOfPosts;
    var MessageNumber = NumberOfPosts + 1;
    var Message = GetTheMessage(MessageNumber);
    SendToTelegram(Message);
  }
}
