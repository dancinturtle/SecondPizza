//
//  LoginViewController.swift
//  Rendezvous
//
//  Created by Laura Wandres on 6/27/16.
//  Copyright © 2016 Laura Wandres. All rights reserved.
//

import UIKit

import Contacts
import ContactsUI

class HomeSettingsViewController: UIViewController, CNContactPickerDelegate, CNContactViewControllerDelegate {
    
    private var store: CNContactStore!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        store = CNContactStore()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    @IBAction func visitSettingsButtonPressed(sender: UIButton) {
        performSegueWithIdentifier("visitSettingsSegue",sender: UIButton.self)
    }
    
    @IBAction func getFriendsButtonPressed(sender: UIButton) {
        checkContactsAccess()
        performSegueWithIdentifier("addFriendsSegue",sender: UIButton.self)
    }
    
    private func checkContactsAccess() {
        switch CNContactStore.authorizationStatusForEntityType(.Contacts) {
        // Update our UI if the user has granted access to their Contacts
        case .Authorized:
            print("access authorized")
            self.accessGrantedForContacts()
            
        // Prompt the user for access to Contacts if there is no definitive answer
        case .NotDetermined :
            self.requestContactsAccess()
            
        // Display a message if the user has denied or restricted access to Contacts
        case .Denied,
             .Restricted:
            let alert = UIAlertController(title: "Privacy Warning!",
                                          message: "Permission was not granted for Contacts.",
                                          preferredStyle: .Alert)
            alert.addAction(UIAlertAction(title: "OK", style: .Default, handler: nil))
            self.presentViewController(alert, animated: true, completion: nil)
        }
    }
    // This method is called when the user has granted access to their address book data.
    func accessGrantedForContacts() {
        let picker = CNContactPickerViewController()
        picker.delegate = self
        
        // Display only a person's phone, email, and birthdate
        let displayedItems = [CNContactPhoneNumbersKey, CNContactEmailAddressesKey, CNContactBirthdayKey]
        picker.displayedPropertyKeys = displayedItems
    }
    
    private func requestContactsAccess() {
        
        store.requestAccessForEntityType(.Contacts) {granted, error in
            if granted {
                dispatch_async(dispatch_get_main_queue()) {
                    self.accessGrantedForContacts()
                    return
                }
            }
        }
    }
   
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}

