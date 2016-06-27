//
//  ContactsViewController.swift
//  Rendezvous
//
//  Created by Benjamin sharf on 6/27/16.
//  Copyright © 2016 Benjamin sharf. All rights reserved.
//

import UIKit

import Contacts
import ContactsUI


enum ActionType: Int {
    case PickContact = 0
}

// Height for the Edit Unknown Contact row
let kUIEditUnknownContactRowHeight: CGFloat = 81.0


class ContactsViewController: UITableViewController, CNContactPickerDelegate, CNContactViewControllerDelegate {
    
    private var store: CNContactStore!
    private var menuArray: NSMutableArray?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        store = CNContactStore()
        checkContactsAccess()
    }
    
    private func checkContactsAccess() {
        switch CNContactStore.authorizationStatusForEntityType(.Contacts) {
        // Update our UI if the user has granted access to their Contacts
        case .Authorized:
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
    
    // This method is called when the user has granted access to their address book data.
    private func accessGrantedForContacts() {
        // Load data from the plist file
        let plistPath = NSBundle.mainBundle().pathForResource("Menu", ofType:"plist")
        self.menuArray = NSMutableArray(contentsOfFile: plistPath!)
        self.tableView.reloadData()
    }
    
    
    //MARK: Table view methods
    
    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return self.menuArray?.count ?? 0
    }
    
    // Customize the number of rows in the table view.
    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 1
    }
    
    // Customize the appearance of table view cells.
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let DefaultCellIdentifier = "DefaultCell"
        let SubtitleCellIdentifier = "SubtitleCell"
        var aCell: UITableViewCell?
        // Make the Display Picker and Create New Contact rows look like buttons
        if indexPath.section < 2 {
            aCell = tableView.dequeueReusableCellWithIdentifier(DefaultCellIdentifier)
            if aCell == nil {
                aCell = UITableViewCell(style: .Default, reuseIdentifier: DefaultCellIdentifier)
            }
            aCell!.textLabel?.textAlignment = .Center
        } else {
            aCell = tableView.dequeueReusableCellWithIdentifier(SubtitleCellIdentifier)
            if aCell == nil {
                aCell = UITableViewCell(style: .Subtitle, reuseIdentifier: SubtitleCellIdentifier)
                aCell!.accessoryType = .DisclosureIndicator
                aCell!.detailTextLabel?.numberOfLines = 0
            }
            // Display descriptions for the Edit Unknown Contact and Display and Edit Contact rows
            aCell!.detailTextLabel?.text = self.menuArray![indexPath.section].valueForKey("description") as! String?
        }
        
        aCell!.textLabel?.text = self.menuArray![indexPath.section].valueForKey("title") as! String?
        return aCell!
    }
    
    override func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        if let actionType = ActionType(rawValue: indexPath.section) {
            switch actionType {
            case .PickContact:
                self.showContactPickerController()
            }
        } else {
            self.showContactPickerController()
        }
    }
    
    //MARK: Show all contacts
    // Called when users tap "Display Picker" in the application. Displays a list of contacts and allows users to select a contact from that list.
    // The application only shows the phone, email, and birthdate information of the selected contact.
    private func showContactPickerController() {
        let picker = CNContactPickerViewController()
        picker.delegate = self
        
        // Display only a person's phone, email, and birthdate
        let displayedItems = [CNContactPhoneNumbersKey, CNContactEmailAddressesKey, CNContactBirthdayKey]
        picker.displayedPropertyKeys = displayedItems
        
        // Show the picker
        self.presentViewController(picker, animated: true, completion: nil)
    }
    
    //MARK: CNContactPickerDelegate methods
    // The selected person and property from the people picker.
    func contactPicker(picker: CNContactPickerViewController, didSelectContactProperty contactProperty: CNContactProperty) {
        let contact = contactProperty.contact
        let contactName = CNContactFormatter.stringFromContact(contact, style: .FullName) ?? ""
        let propertyName = CNContact.localizedStringForKey(contactProperty.key)
        let message = "Picked \(propertyName) for \(contactName)"
        
        dispatch_async(dispatch_get_main_queue()) {
            let alert = UIAlertController(title: "Picker Result",
                                          message: message,
                                          preferredStyle: .Alert)
            alert.addAction(UIAlertAction(title: "OK", style: .Default, handler: nil))
            self.presentViewController(alert, animated: true, completion: nil)
        }
    }
    
    // Implement this if you want to do additional work when the picker is cancelled by the user.
    func contactPickerDidCancel(picker: CNContactPickerViewController) {
        picker.dismissViewControllerAnimated(true, completion: {})
    }
    
    
    func contactViewController(viewController: CNContactViewController, shouldPerformDefaultActionForContactProperty property: CNContactProperty) -> Bool {
        return true
    }
    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

}