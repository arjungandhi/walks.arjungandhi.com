+++
author = "Hugo Authors"
title = "Rich Content"
date = "2019-03-10"
header = "Site Support"
description = "A brief description of Hugo Shortcodes"
tags = [
    "shortcodes",
    "privacy",
]
categories = [
    "site-support",
]
draft = "true"
+++

Hugo ships with several [Built-in Shortcodes](https://gohugo.io/content-management/shortcodes/#use-hugos-built-in-shortcodes) for rich content, along with a [Privacy Config](https://gohugo.io/about/hugo-and-gdpr/) and a set of Simple Shortcodes that enable static and no-JS versions of various social media embeds.
<!--more-->
---

## YouTube Privacy Enhanced Shortcode

{{< youtube ZJthWmvUzzc >}}

<br>

---

## Twitter Simple Shortcode

{{< twitter_simple 1085870671291310081 >}}

<br>

---

## Vimeo Simple Shortcode

{{< vimeo_simple 48912912 >}}

## Block Quote Short code

Normal quote:
{{< blockquote >}}
  This is a simple quote.
{{< /blockquote >}}

Quote with author
{{< blockquote author="Author2" >}}
  This is a quote with only an Author named Author2.
{{< /blockquote >}}

Quote with author and source
{{< blockquote author="Author3" source="Source" >}}
  This is a quote from Author3 and source "source."
{{< /blockquote >}}

Quote with author and link
{{< blockquote author="Author4" link="https://www.google.com" >}}
  This is a quote from Author4 and links to https://www.google.com.
{{< /blockquote >}}

Quote with author, link and title
{{< blockquote author="Author5" link="https://www.google.com" title="Google" >}}
  This is a quote from Author5 and links to https://www.google.com with title "Google."
{{< /blockquote >}}

Quote with author and a link longer than 32 characters, string is first cut at 32 characters then everything after the last forward slash is removed
{{< blockquote author="Author6" link="https://twitter.com/CryptoGangsta/status/716427930126196737" >}}
  This is a quote from Author5 and links to https://twitter.com/CryptoGangsta/status/716427930126196737 which is longer than 32 characters.
  <br>And this is a new line in the quote with the HTML br tag.
{{< /blockquote >}}

Test from the Octopress blockquote page at: http://octopress.org/docs/plugins/blockquote/
{{< blockquote author="@allanbranch" link="https://twitter.com/allanbranch/status/90766146063712256" >}}
  Over the past 24 hours I've been reflecting on my life & I've realized only one thing. I need a medieval battle axe.
{{< /blockquote >}}