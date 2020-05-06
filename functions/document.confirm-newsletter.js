exports.data = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      }
      h1 {
        font-family: -apple-system, BlinkMacSystemFont, "Lucida Sans",
          "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode",
          "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
          "Helvetica Neue", Geneva, Verdana, sans-serif;
      }
      a:not(.button) {
        color: cornflowerblue;
      }
      a:not(.button):hover {
        color: steelblue;
      }
      a.button {
        background-color: cornflowerblue;
        color: white;
        text-decoration: none;
        padding: 0.7rem 1rem;
        border-radius: 5px;
        border: 1px solid transparent;
        text-align: center;
        display: inline-block;
        margin: auto;
      }
    </style>
  </head>
  <body style="max-width: 768px;margin: auto;">
    <header>
      <h1>Newsletter Confirmation</h1>
    </header>
    <main>
      <p>
        Hello there! We see you reached out to us and want us to give you a
        heads-up anytime we put up a new post. What we are saying is: you signed
        up for our newsletter. This makes you a part of our mailing list and
        allows us to send you a mock up of new posts, on
        <a href="https://eaveswall.com">Eaveswall</a>, anytime there's any. We
        promise not to send you spam.
      </p>

      <p>
        You are expected to confirm that this was really you before we can start
        sending you what's trending. If this was you, follow the link below; if
        it's not, don't worry just ignore this email.
      </p>
      <div>
        <div style="max-width: max-content;max-width: fit-content;margin: auto;">
          <a href="<%=data.confirmLink%>" class="button">CONFIRM IT'S YOU</a>
        </div>
      </div>
    </main>
  </body>
</html>
`
