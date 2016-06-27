//
//  LoginViewController.swift
//  Rendezvous
//
//  Created by Laura Wandres on 6/27/16.
//  Copyright © 2016 Laura Wandres. All rights reserved.
//

import UIKit

class LoginViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    @IBAction func register(sender: UIButton) {
        performSegueWithIdentifier("registerSegue",sender: UIButton.self)
    }
    
    
    
    @IBAction func loginUser(sender: UIButton) {
        performSegueWithIdentifier("loginSegue",sender: UIButton.self)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
}

