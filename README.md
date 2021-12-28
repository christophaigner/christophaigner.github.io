# About

Hi there! 👋🏼  
I'm **Christoph**, an Engineering Leader based in Vienna, Austria 🇦🇹

This blog was created using [Jekyll](https://jekyllrb.com), a static site generator and [Liquid](https://shopify.github.io/liquid/), a template engine.

## Jekyll

### Build

Since Jekyll is a static site generator, it has to build the site before you can view it.

Build the site and output a static site to a directory called `_site`:

```bash
bundle exec jekyll build
```

By using the `--verbose` build command option you can print verbose output.

```bash
bundle exec jekyll build --verbose
```

### Run

Executes `bundle exec jekyll build` and runs it on a local web server at `http://localhost:4000`.

```bash
bundle exec jekyll serve
```

Pass the `--livereload` option to serve to automatically refresh the page with each change you make to the source files:

```bash
bundle exec jekyll serve --livereload
```

### Doctor

Outputs any deprecation or configuration issues.

```bash
bundle exec jekyll doctor
```

### Clean

Removes all generated files: destination folder, metadata file, Sass and Jekyll caches.

```bash
bundle exec jekyll clean
```
