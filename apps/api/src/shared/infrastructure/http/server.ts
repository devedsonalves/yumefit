import ora from 'ora'

import { app } from './app'

app.listen(process.env.PORT || 3000, () => {
  return (ora('Server is running...').start().color = 'green')
})
