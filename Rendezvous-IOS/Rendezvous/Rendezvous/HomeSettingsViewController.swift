//
//  LoginViewController.swift
//  Rendezvous
//
//  Created by Laura Wandres on 6/27/16.
//  Copyright © 2016 Laura Wandres. All rights reserved.
//

import UIKit


class HomeSettingsViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    @IBAction func visitSettingsButtonPressed(sender: UIButton) {
        performSegueWithIdentifier("visitSettingsSegue",sender: UIButton.self)
    }
    
    @IBAction func getFriendsButtonPressed(sender: UIButton) {
        performSegueWithIdentifier("addFriendsSegue",sender: UIButton.self)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
}

