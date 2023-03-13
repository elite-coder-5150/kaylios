# Relation Class

#### Methods

1. **request** - This function send a friend request from one user to another, by adding a new row to the **relations table** in to database. This method first checks to see if the users are already friends or if a friend request has already been sent. If either of these conditions are true, the method sets an error message. If The users are not already friends and no friends request has been sent, the method insert a new row into the **relations** table with a **status** of 0 (pending) indicating that the friend request has been sent.

	**Parameters**:
	- **from** (string) - the ID of the user sending the friend request
	- **to** (string) - the ID of the user receiving the friend request
	**Returns value**: None

	**Errors**:
	- if the users are already friends, the method set the **error** property to "You are already friends with this user".
	- If a friend request has alreadybeen sent, the method set the **error** property to "You have already sent a friend request to this user"

<hr>

**Notes**:
- The **alreadyFriend** and **isPending** methods are assuming to be defined elsewhere in the **Relation** class, and are used to check if the user is already friends or if the friend request has already been sent. 

```php
/**  
 * send a friend request * * @param $from  
 * @param $to  
 * @return void  
 */  
public function request($from, $to) {  
    if ($this->alreadyFriend($from, $to)) {  
        $this->error = "You are already friends with this user";  
    } else if ($this->isPending($from, $to)) {  
        $this->error = "You have already sent a friend request to this user";  
    } else {  
        $sql = "INSERT INTO `relation` 
		        (`from`, `to`, `status`, `time`) 
		        VALUES (:from, :to, 0, now())";
		        
        $query = $this->db->prepare($sql);  
        $query->execute([':from' => $from, ':to' => $to]);  
    }
}
```

2. **acceptRequest** - This method is responsible for accepting a friend request between two users, by updating the **status** of the corresponding row in the **relation** table to **pending**, and adding a new row to the **relation** table to indicate that the two users are now friends. This method first executes and update query on the **relation** table to set the status of teh row corresponding to the friend request to **pending**. The method then check if any rows were affected by the **update** query. If no rows were affected, the method set an error message and returns false. If the **update** query succeeded, the method insert a new row into the **relations** table to indicate that the two users are now friends
	**Parameters**
	- **From** (integer) - the id of the user accepting the request
	- **To** (integer) - the id of the user who sent the request.

	**Return value**:
	- **True** - if the friend request was accepted successfully.
	- **False**. - if there was an error or the other user rejected the request.

	**Errors**:
	- If the **update** query does not affect any row, the method set the **error** property to invalid request and returns **false**

<hr>

**Notes**:
- The **relation** table is assumed to have a **status** column that indicates the status of the friend request (0 for pending, 1 for accepted and 2 for declined, etc)
- **Relation** table is assumed to hvae a row for each friend request, with columns **from**, **to**, and **time** to indicate the users involved and the time that the friendships was estabilished

```php
public function acceptRequest ($from, $to) {  
    $sql = "UPDATE `relation` SET `status` = 'pending' 
	    WHERE (
		    `from` = :from AND `to` = :to) OR (
		    `from` = :to AND `to` = :from
	    )";  
    $query = $this->db->prepare($sql);  
    $query->execute([':from' => $from, ':to' => $to]);  
    if ($query->rowCount() == 0) {  
        $this->error = "invalid request";  
        return false;  
    }      

	$sql = "INSERT INTO `relations` (`from`, `to`, `time`) 
			VALUES (:from, :to, now())";  
			
    $query = $this->db->prepare($sql);  
    $query->execute([':from' => $from, ':to' => $to]);  
    return true;  
}
```

3. **isPending** - this method is private that checks if a friend request is already pending between two users.

	**Parameter
	- **From** - The user id of the user who sent the request
	- **To** - The user id of the user who receive the request.

	**Return value**:
	- if a friend request is already pending between two users, it return true
	- if there is no pending requests between any two users, it return false

```php
private function isPending($from, $to) {  
    $sql = "SELECT * FROM `relation` WHERE ( 
		    (`from` = :from AND `to` = :to) OR (
		    `from` = :to AND `to` = :from)) 
		     AND `status` = 0";  
  
    $query = $this->db->prepare($sql);  
    $query->execute([':from' => $from, ':to' => $to]);  
  
    if ($query->rowCount() == 1) {  
        return true;  
    } else {  
        return false;  
    }}
```

4. **alreadyFriends** - This method is private that checks if two users are already friends.
	
	**Parameters**:
	- **From** - user id of the first user
	- **To** - user id of the second user

	**Return value**:
	- if the two users are already friends, it returns true, otherwise false

```php
private function alreadyFriend($from, $to) {  
    $sql = "SELECT * FROM `relation` 
		    WHERE `from` = :from AND `to` = :to";  
  
    $query = $this->db->prepare($sql);  
    $query->execute([':from' => $from, ':to' => $to]);  
  
    if ($query->rowCount() == 1) {  
        return true;  
    } else {  
        return false;  
    }}
```


5. **isFollowing** - The method simple check if the current user is following the user with the given id.

	**Parameters**:
	- **Get** - The id of the user to check if the current user is following

	**Return value**:
	- if the current user is following the user with the given id, the method return true, else it will return false if the user is not following you.

	**Notes**:
	- This method assumes that the current users id is stored in the **session** variable under the key of id.
	- This method used a databaes table called **follow_system** to store information about who is following whom.

```php
public function isFollowing($get) {  
    if (isset($_SESSION['id'])) {  
        $session = $_SESSION['id'];  
  
        $sql = "SELECT follow_to FROM follow_system 
		        WHERE follow_by=:session 
		        AND follow_to=:get limit 1";  
  
        $query = $this->db->prepare($sql);  
        $query->execute(array(':session' => $session, ':get' => $get));  
  
  
        return $query->rowCount() != 0 || $query->rowCount() != null;  
    }}
```

6. **cancelRequest** - This method simply defines the functionality that cancels any friend request that was previously sent by another user. This method accepts to parameters: the ID of the user who sent the request and the id of teh user to who the freidn request was sent. It then delete the corresponding row from the **relation** table in the database, which cancels the request. The method returns true if the request was successfully canceled, or it return false depending on what is returned.

	**Parameters**:
	- **From** - id of the user who sent the request
	- **To** - id of teh user who the request is for

	**Return value**:
	- **boolean** - true if the request was successfully canceled, false otherwise.

```php
public function cancelRequest ($from, $to) {  
    $sql = "DELETE FROM `relation` 
		    WHERE (`from` = :from AND `to` = :to) OR (
		    `from` = :to AND `to` = :from)";  
  
    $query = $this->db->prepare($sql);  
    $query->execute([':from' => $from, ':to' => $to]);  
  
    return true;  
    }
```

7. **blockUser** - This method is responsible for blocking contact and unfriends  another user. It adds a new row to the **relation** table with a status of friends. it then calls the unfriend method to remove the previous friendship status between two users.

	**Access**: Public
	
	**Parameters**:
	- **From** - The user id of the user who want to blaock the other user
	- **To** - The user id of the user who is being blocked

	**Returns**:
	- None

```php
public function block($from, $to) {  
    $sql = "INSERT INTO `relation` (from, to, status, time) 
		    VALUES (:from, :to, 'friends', now())";  
  
    $query = $this->db->prepare($sql);  
    $query->execute([':from' => $from, ':to' => $to]);  
  
    $this->unfriend($from, $to);  
}
```

8. isBlocked - This method simple check if a given user id is in the list of blocked users. it retrieves the list of blocked users from the **blocked** table in the database, and returns an array with the blocked users ids and the date they were blocked.

	**Parameters**:
	- **blocked** - is the key of the array of blocked users, which contains the user ids as keys and the date they were blocked as values.
	- **user_id** - represnet the id of the user being blocked.
	- **date_since_blocked** - is a string representing the date the user as blocked.

```php
public function isBlocked($user_id) {  
    $sql = "SELECT user_id FROM blocked
		    WHERE user_id=:user_id";

	$query = $this->db->prepare($sql);
	$query->execute([
		':user_id' => $user_id
	]);

	$blocked = false;

	while ($row = $query->fetch()) {
		$blocked = true	
	}

	return $blocked;
}
```

9. getBlockedUsers - This method is responsible for retrieving all the users that a given user with the ID of **id** has blocked.

	This method first constructs a SQL query that selects all rows from the **relation** table where the **From** column is equal to the **id** and the **status** column is set to blocked. It then prepares and executes the query using the database connection stored the **$this->db**, binding the value of **id** to the :id parameter in the query. Finslly, the method returns the result of the query as an array of associated arrays using the **fetchAll()** method of the PDOStatement object returned by the **execute()** method. Each associative array in the result represnets a row in the **relation** table, with keys corresponding to cluymn names and values corresponding to the values stored in the row.

```php
public function getBlockedUsers($id) {  
    $sql = "SELECT * FROM `relation` 
		    WHERE `from` = :id 
		    AND `status` = 'blocked'";  
  
    $query = $this->db->prepare($sql);  
    $query->execute([':id' => $id]);  
  
    return $query->fetchAll();
}
```



