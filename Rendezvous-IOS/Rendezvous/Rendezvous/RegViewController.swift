//
//  LoginViewController.swift
//  Rendezvous
//
//  Created by Laura Wandres on 6/27/16.
//  Copyright © 2016 Laura Wandres. All rights reserved.
//

import UIKit

class RegViewController: UIViewController {
    
    
    @IBOutlet weak var userFirstNameTextField: UITextField!
    
    @IBOutlet weak var userLastNameTextField: UITextField!
    
    @IBOutlet weak var usernameTextField: UITextField!
    
    @IBOutlet weak var userEmailTextField: UITextField!
    
    @IBOutlet weak var userPasswordTextField: UITextField!
    
    @IBOutlet weak var userConfirmPasswordTextField: UITextField!
    
    @IBOutlet weak var userPhoneTextField: UITextField!
    
    
    

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    @IBAction func regsubmitButtonPressed(sender: UIButton) {
        let userFirstName = userFirstNameTextField.text
        let userLastName = userLastNameTextField.text
        let username = usernameTextField.text
        
        let userEmail = userEmailTextField.text
        let userPassword = userPasswordTextField.text
        let userConfirm = userConfirmPasswordTextField.text
        let userPhone = userPhoneTextField.text
        //check for empty fields
        if userFirstName!.isEmpty || userLastName!.isEmpty || userEmail!.isEmpty || username!.isEmpty || userPassword!.isEmpty || userConfirm!.isEmpty || userPhone!.isEmpty {
            displayAlertMessage("All fields are required")
            return
        }
        //check the passwords match
        if userPassword! != userConfirm! {
            displayAlertMessage("Passwords do not match")
            return
        }
        //send user data to server side
        let myUrl = NSURL(string: "http://localhost:8000/adduser")
        let request = NSMutableURLRequest(URL:myUrl!)
        request.HTTPMethod = "POST"
        let postString = "firstname=\(userFirstName!)&lastname=\(userLastName!)&username=\(username!)&email=\(userEmail!)&password=\(userPassword!)&phone=\(userPhone!)"
        request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
        let task = NSURLSession.sharedSession().dataTaskWithRequest(request){
            data, response, error in
            if error != nil {
                print("error = \(error)")
                return
            }
            var err: NSError?
            
            do {
                if let jsonResult = try NSJSONSerialization.JSONObjectWithData(data!, options: .MutableContainers) as? NSDictionary {
                    print("after reg button", jsonResult)
                    self.displayAlertMessage("Registration successful!")
                }//closes if let jsonResult
            }//closes do
            catch {
                print(error)
            }
        }//closes let task
        task.resume()
        
        performSegueWithIdentifier("gotoSettingsSegue",sender: UIButton.self)
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func displayAlertMessage(userMessage:String) {
        let alert = UIAlertController(title:"Alert", message: userMessage, preferredStyle: UIAlertControllerStyle.Alert)
        let okAction = UIAlertAction(title:"Ok", style:UIAlertActionStyle.Default, handler: nil)
        alert.addAction(okAction)
        self.presentViewController(alert, animated:true, completion:nil)
    }


}

