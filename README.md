# sendmail

Send email with Mailgun

## Usage

```js
const sendmail = require("@tridnguyen/sendmail");

await sendmail("Hello\nWorld", {
  to: "myfriend@example.com",
  from: '"Me 👻" <me@example.com>',
  subject: "Hello ✔",
});
```
