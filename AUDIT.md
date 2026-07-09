# Website Audit

## Finding 1

**Area:** UI/UX

**Observation:**  
Main domain [Moldcell](https://moldcell.md) is not responsible, it has a layout only for desktop.

**Why it matters:**  
It's pushing new people off. It's hard to navigate on first visit, hard to read, hard to select options from menu.

**Suggested fix:**  
Migrate to a "Mobile first" rule when developing every new feature/page.


## Finding 2

**Area:** UI

**Observation:**  
Ironically, the filters are a little bit hard to use, for example, filters are derived from current filtered products.

**Why it matters:**  
Because of not having an api route that sends all possible filters, in the UI if we select "Samsung", then we can't select another brand.
User 100% would want to select more than 1 brand to compare them. This is applicable for all other filters.

**Suggested fix:**  
This needs an api route that contains all possible filters, or independent api for reuse in other sections for every filter,
e.g. "/api/brands" or "/api/filters/(product-type)" and will require query parsing for multiple values.


## Finding 3

**Area:** UI

**Observation:**  
Website needs a commong design, some pages are old and feels not on their place and time. It needs a designer.

**Why it matters:**  
Again, it can't deliver the full trust to clients with a seamless experience.

**Suggested fix:**  
Hire a designer as well. That will "audit" whole website with a developer and fix page per page.


### What will I change in the first day?
Check every page, and make the ones which are desktop only mobile responsive or even refactor for a mobile first approach.