module.exports = {
  // dbURL: 'mongodb+srv://theUser:thePass@cluster0-klgzh.mongodb.net/test?retryWrites=true&w=majority',
  dbURL: `mongodb+srv://${process.env.DB_KEY}@cluster0.py8ft.mongodb.net/boards_db?retryWrites=true&w=majority`,
}
