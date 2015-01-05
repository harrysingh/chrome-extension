## Modify Headers
 - Requirements
 - Json Api
 - Similar Chrome Extensions
 - Notes

#### Requirements
1. User should be able to modify headers in Request as well as Response.
2. User should be able to include multiple header modifications within a single rule.
3. Modification should support Addition as well as Removal of headers.
4. There can be condition when header modification should apply. e.g.

  > Url {matches/contains/is} {regex/string/some_url/string}
  
#### Json Structure of Rule

    {
      id: "ModifyHeader_1404481343478",
      name: "Cross Domain Header Modification Rule",
      description: "Modifying Headers to accept cross domain resources in my Chrome browser",
      ruleType: "Modify_Headers",
      status: "Inactive",
      creationDate: 1404481343478,
      pairs: [
        {
          type: Add, /* Add/Remove are posible values */
          target: Response,  /* Request/Response */
          header: 'Access-Control-Allow-Origin',
          value: '*'
        }
      ]
    }
      
#### Similar Chrome Extensions
1. [Modify Headers for Google Chrome](https://chrome.google.com/webstore/detail/modify-headers-for-google/innpjfdalfhpcoinfnehdnbkglpmogdi)
2. [ModHeader](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?hl=en)
3. [HeaderEditor](https://chrome.google.com/webstore/detail/header-editor/pkokmcnklmgbepioackopoknkdlhefjl?hl=en)

#### Notes
1. Chrome Dev Tools is unable to show modifications in response headers.
  - StackOverflow Link: http://stackoverflow.com/questions/18102082/modifying-response-headers-in-chrome
  - Chromium Bug: https://code.google.com/p/chromium/issues/detail?id=258064