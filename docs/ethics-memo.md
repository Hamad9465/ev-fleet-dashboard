# Ethics Memo: Privacy

**Project:** EcoCharge Fleet Dashboard
**Team:** Hamad, Mayed
**Question chosen:** Privacy. The final product would use real vehicle location data. What is one key privacy concern, and what is one mitigation we would propose?

## Key privacy concern

The biggest concern is that tracking the vehicle is basically the same as tracking the driver. If the system records location all the time, the company could see where a driver goes on breaks, where they live, or places they visit after work if they take the car home. Drivers might not even know how much is being collected. This goes against ACM principle 1.6 (Respect privacy), which says we should only collect personal information that is really needed and make sure people know how it's used. It also connects to principle 1.2 (Avoid harm), because this data could be leaked or used to watch employees unfairly.

## Mitigation

We would follow data minimization. The system should only record location while the car is on an actual work trip, and stop tracking when the car is parked or off duty. For example if a driver takes the car home at night, nothing should be recorded until their next shift starts. Location history should be deleted after a short time, like 30 days, and only managers who need it should be able to see it. Drivers should also be told clearly what is collected and why before the system goes live.
