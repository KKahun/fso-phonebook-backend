const PhonebookEntry = require('./models/person')
PhonebookEntry.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
})

/*
const note = new Note({
  content: 'This is a stupid note',
  important: false,
})

note.save().then(result => {
  console.log(result)
  console.log('note saved!')
  mongoose.connection.close()
})

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
*/