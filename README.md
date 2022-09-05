# projeto18-valex

This app is made for companies and it's uses are: creating specific vouchers cards for employees, recharging them and saving transactions with those cards.

How does it work?


To create cards:
 - HTTP request method: .POST('/newcard')
 - req object expects:
 	- req.headers: ['x-api-key'] || "";
 	- req.body: employeeId, type;
 	
To activate card:
 - HTTP request method: .POST('/activatecard')
 - req object expects:
 	- req.body: id, securityCode, password;
 	
 	
To get account history:
 - HTTP request method: .GET('/extract/:id')
 - req object expects:
 	- req.params: cardId;
 	
To get block and unblock a card:
 - HTTP request method: .PUT('/blockcard') || .PUT('/unblockcard')
 - req object expects:
 	- req.params.id: cardId;
 	
To recharge a card:
 - HTTP request method: .POST('/recharge')
 - req object expects:
 	- req.body: id, amount;
 	
To register a purchase:
 - HTTP request method: .POST('/sale')
 - req object expects:
 	- req.body: cardId, password, businessId, amount;