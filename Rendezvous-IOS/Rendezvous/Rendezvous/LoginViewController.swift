//
//  LoginViewController.swift
//  Rendezvous
//
//  Created by Laura Wandres on 6/27/16.
//  Copyright © 2016 Laura Wandres. All rights reserved.
//

import UIKit

class LoginViewController: UIViewController {
    
    
    @IBOutlet weak var usernameTextField: UITextField!
    
    @IBOutlet weak var passwordTextField: UITextField!
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    @IBAction func register(sender: UIButton) {
        performSegueWithIdentifier("registerSegue",sender: UIButton.self)
    }
    
    
    
    @IBAction func loginUser(sender: UIButton) {
        let password = passwordTextField.text
        let username = usernameTextField.text
        let myURL = NSURL(string: "http://localhost:8000/finduser")
        let request = NSMutableURLRequest(URL:myURL!)
        request.HTTPMethod = "POST"
        let postString = "username=\(username!)&password=\(password!)"
        request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
        let task = NSURLSession.sharedSession().dataTaskWithRequest(request) {
            data, response, error in
            if error != nil {
                print("error = \(error)")
                return
            }
            var err: NSError?
            do{
                if let jsonResult = try NSJSONSerialization.JSONObjectWithData(data!, options: .MutableContainers) as? NSDictionary {
                    if jsonResult["user"] != nil{
                        print(jsonResult["user"]!)
                        NSOperationQueue.mainQueue().addOperationWithBlock {
                            self.performSegueWithIdentifier("loginSegue", sender: self)
                        }

                    }
                    else {
                        print("Nothing")
                        NSOperationQueue.mainQueue().addOperationWithBlock {
                        self.displayAlertMessage("You need to register!")
                        }
                    }
                }
                
            }//closes do
            catch {
                print(error)
            }
        }
        task.resume()
        
        
    }
    
    
    func displayAlertMessage(userMessage:String) {
        let alert = UIAlertController(title:"Alert", message: userMessage, preferredStyle: UIAlertControllerStyle.Alert)
        let okAction = UIAlertAction(title:"Ok", style:UIAlertActionStyle.Default, handler: nil)
        alert.addAction(okAction)
        self.presentViewController(alert, animated:true, completion:nil)
    }
    
    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
}

