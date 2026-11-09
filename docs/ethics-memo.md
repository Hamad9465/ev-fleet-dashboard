# Ethics Memo: Privacy

**Project:** EcoCharge Fleet Dashboard
**Team:** Hamad, Mayed
**Question chosen:** Privacy. The final product would use real vehicle location data. What is one key privacy concern, and what is one mitigation we would propose?

## Key privacy concern

The biggest concern is that tracking the vehicle is basically the same as tracking the driver. If the system records location all the time, the company could see where a driver goes on breaks, where they live, or places they visit after work if they take the car home. Drivers might not even know how much is being collected. This goes against ACM principle 1.6 (Respect privacy), which says we should only collect personal information that is really needed and make sure people know how it's used. It also connects to principle 1.2 (Avoid harm), because this data could be leaked or used to watch employees unfairly.

## Mitigation

We would follow data minimization. The system should only record location while the car is on an actual work trip, and stop tracking when the car is parked or off duty. For example if a driver takes the car home at night, nothing should be recorded until their next shift starts. Location history should be deleted after a short time, like 30 days, and only managers who need it should be able to see it. Drivers should also be told clearly what is collected and why before the system goes live.

---

## Appendix: extra detail (not part of the 200 word memo)

### ACM Code of Ethics principles we used

| Principle | What it says (short) | How it applies to us |
|-----------|---------------------|----------------------|
| 1.2 Avoid harm | Avoid negative effects on people, like loss of information or unjust harm | Location history could be leaked or used to watch employees unfairly |
| 1.6 Respect privacy | Only collect the personal data that's needed, be clear about how it's used, and protect it | Tracking a company car is basically tracking the driver, so we should collect as little as possible |
| 2.9 Design and implement systems that are robustly and usably secure | Security has to be built in, not added later | Location data needs a login and limited access before the feature goes live (links to our security memo) |
| 3.1 Ensure that the public good is the central concern | Think about the people affected, not only the company | Drivers are affected the most but they're not the ones using the dashboard |

### Who is affected (stakeholders)

| Stakeholder | What they want | Privacy risk for them |
|-------------|----------------|-----------------------|
| Fleet managers | Know where cars are so they can plan trips and charging | Low, they're the ones using the system |
| Drivers | Do their job without being watched all the time | High, their movements, breaks and maybe home address get recorded |
| The company | Use the fleet well and save money | Legal and reputation problems if the data leaks or is misused |
| Customers or the public | Not much direct interest | Low, unless the cars carry customers |

### Extra mitigations we'd add

* **Less exact location for most people:** most managers only need to know the area or which charger a car is at, not the exact GPS point. Only a small number of people should see the exact location.
* **Access log:** record who looked at a car's location and when, so the data can't be checked quietly without a reason.
* **Drivers can see their own data:** let drivers see what was recorded about them, so it's not a secret.
* **Follow the law:** in the UAE, the Personal Data Protection Law (Federal Decree Law No. 45 of 2021) covers personal data like this, and data minimization is also a main idea in the EU's GDPR (Article 5).

### How this affected our project

This is why the live map story (US9) is marked as **Won't** in our product backlog for now. We'd want the privacy rules above decided first before building it.

### References

* ACM Code of Ethics and Professional Conduct (2018): https://www.acm.org/code-of-ethics
