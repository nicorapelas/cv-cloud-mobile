import React, { useState, useContext } from 'react'
import {
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { CheckBox } from 'react-native-elements'

import { Context as AuthContext } from '../../context/AuthContext'
import { Context as UniversalContext } from '../../context/UniversalContext'

const TermsAndConditions = () => {
  const [privacyChecked, setPrivacyChecked] = useState(false)
  const [termsChecked, setTermsChecked] = useState(false)

  const { fetchUser, acceptTermsAndConditions } = useContext(AuthContext)
  const { buildCV } = useContext(UniversalContext)

  const renderContent = () => {
    return (
      <ScrollView>
        <Text style={styles.heading}>CV CLOUD</Text>
        <Text style={styles.heading}>
          MOBILE APPLICATION / WEBSITE TERMS OF USE
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          CV Cloud is owned and operated by a sole proprietorship. CV Cloud has
          been developed to assist users with compiling a professional CV within
          a couple of minutes.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          These Terms of Use should be read together with our Privacy Policy
          that follows.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          1 Acceptance of these Terms of Use.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          1.1 These Terms of Use, including our Privacy Policy and all other
          polices that may be posted on CV Cloud set out the terms on which we
          offer you access to use our mobile application and website. All of our
          policies are incorporated into these Terms of Use. Your agree to
          comply with all of our policies and in particular these Terms of Use
          when you access and use our website.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          1.2 It is your responsibility to familiarise yourself with these Terms
          and check them regularly for any updates.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          1.3 By accessing the website and using our services, you agree to all
          the terms set out in these Terms of Use, which are designed to make
          sure that the website is useful to everyone. Should you not agree to
          these terms, or any of our updates or changes thereto as dealt with
          below, you should not access or use website.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          1.4 You confirm that you are 18 years or older, or that you have been
          duly assisted to consent to these terms.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          2 Log-in details and passwords.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          2.1 You must be registered to create a CV on CV Cloud. You are
          responsible for all actions taken using your username, email address
          and password.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          2.2 You agree that you will use your username and password for your
          personal use only and will not disclose it to or share it with any
          unauthorised third party.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3 Using CV Cloud.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.1 As a condition of your use of CV Cloud, you agree that you will
          not:
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.1.1 use CV Cloud in any manner that could impair our mobile
          application and/or website in any way or interfere with any party’s
          use or enjoyment of our mobile application and/or website;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.1.2 distribute viruses or any other technologies that may harm CV
          Cloud or the interests or property of CV Cloud users;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.1.3 impose an unreasonable load on our infrastructure or interfere
          with the proper working of CV Cloud;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.1.4 copy, modify, or distribute any other person's content without
          their consent;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.1.5 use any robot spider, scraper or other automated means to access
          CV Cloud and collect content for any purpose without our express
          written permission;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.1.6 harvest or otherwise collect information about others, including
          email addresses, without their consent or otherwise violate the
          privacy of another person;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.1.7 bypass measures used to prevent or restrict access to CV Cloud.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.2 You are solely responsible for all information that you upload to
          CV Cloud and any resultant consequences. We reserve the right for any
          or no reason, at our discretion to refuse or delete any CV content (or
          any part thereof) that we believe is inappropriate or is in breach of
          these Terms of Use or any of our other policies. We also reserve the
          right at our discretion to restrict your use of CV Cloud either
          temporarily or permanently, or refuse a your registration.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          4 Protecting CV Cloud.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          4.1 CV Cloud works to keep the mobile application / website working
          properly and the community safe. Please report problems, offensive
          content and policy breaches to us at the following email address
          nicorapelas@gmail.com
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          4.2 Without limiting other remedies which might be available to us, we
          may issue warnings, limit or terminate our service, remove hosted
          content and take technical and legal steps to keep users off CV Cloud
          if we think that they are creating problems or acting inconsistently
          with the letter or spirit of our policies. However, whether we decide
          to take any of these steps is our decision and we do not accept any
          liability for monitoring CV Cloud or for unauthorised or unlawful
          content on CV Cloud or use of CV Cloud by users.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          4.3 You also recognise and accept that CV Cloud is not under any
          obligation to monitor any data or content which is submitted to or
          available on the website.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          5 Fees.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          5.1 Using CV Cloud to create, email and print your CV is free.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          5.2 You may incur data charges at your carrier’s applicable rates when
          using CV Cloud.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          6 Content on CV Cloud.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          CV Cloud may contain content from us and other businesses that may
          advertise on the mobile application and/or website from time to time.
          CV Cloud is protected by copyright laws. Content displayed on or via
          CV Cloud is protected as a collective work and/or compilation,
          pursuant to copyrights laws. You agree not to copy, distribute or
          modify content from CV Cloud without our express written consent. You
          may not disassemble or decompile, reverse engineer or otherwise
          attempt to discover any source code contained in CV Cloud. Without
          limiting the foregoing, you agree not to reproduce, copy, sell,
          resell, or exploit for any purposes any aspect of CV Cloud.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          7 Liability.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          7.1 CV Cloud does not act a labour broker, or otherwise. CV Cloud is
          only a platform which allows users to create, email and print their CV
          and is not otherwise involved in any users job applications process.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          7.2 We do not actively monitor data or content. We are not involved in
          any interactions which may subsequently be entered into as a result of
          preparing your CV on CV Cloud.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          7.3 You understand that it is a criminal offence to deliberately
          include any false information and/or information which may deceive a
          prospective employer in your CV. CV Cloud does not take any
          responsibility for the content included in your CV and it is your
          responsibility to ensure that your CV is correct, no misleading and up
          to date.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          7.4 CV Cloud may contain links to third-party websites which offer
          certain goods or services. These websites, services and and/or goods
          are beyond the control of CV Cloud. CV Cloud is not involved in
          transactions between users and the operators of such third-party
          sites. CV Cloud does not accept responsibility for their content,
          services and/or products.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          7.5 We cannot guarantee continuous, error-free or secure access to our
          services or that defects in the service will be corrected.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          7.6 While we will use reasonable efforts to maintain an uninterrupted
          service, we cannot guarantee this and we do not give any promises or
          warranties (whether express or implied) about the availability of our
          website.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          7.7 Accordingly, to the extent legally permitted we expressly disclaim
          all warranties, representations and conditions, express or implied,
          including those of quality, merchantability, merchantable quality,
          durability, fitness for a particular purpose and those arising by
          statute. We are not liable for any loss, whether of money (including
          profit), goodwill, or reputation, or any special, indirect, or
          consequential damages arising out of your use of CV Cloud, even if you
          advise us or we could reasonably foresee the possibility of any such
          damage occurring.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          7.8 Nothing in these terms shall limit our liability for fraudulent
          misrepresentation, for death or personal injury resulting from our
          negligence or the negligence of our agents or employees.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          8 Security.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          In order to ensure the security and reliable operation of the website
          for all users, we reserve the right at our sole and absolute
          discretion to take whatever action it finds necessary to preserve the
          security, integrity and reliability of our network and back-office
          applications. Any user who commits any of the offences detailed in
          Chapter 13 of the Electronic Communications and Transactions Act, 2002
          (specifically sections 85 to 88 (inclusive)) or the Cybercrimes Act,
          2020 will, notwithstanding criminal prosecution, be liable for all
          resulting liability, loss or damages suffered and/or incurred by CV
          Cloud and its affiliates, agents and/or partners.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          9 General.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          9.1 These terms and the other policies posted on CV Cloud constitute
          the entire agreement between CV Cloud and you.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          9.2 This agreement shall be governed by the laws of the Republic of
          South Africa. You agree that any claim or dispute you may have against
          CV Cloud must be resolved by in the courts of the Republic of South
          Africa.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          9.3 If we don't enforce any particular provision, we are not waiving
          our right to do so later. If a court strikes down any of these terms,
          the remaining terms will survive.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          9.4 We may update these Terms of Use at any time and in our sole
          discretion. Any such change will be effective from the date of being
          posted on the mobile application / website.
        </Text>
        <Text style={styles.heading}>CV CLOUD</Text>
        <Text style={styles.heading}>
          MOBILE APPLICATION / WEBSITE PRIVACY POLICY
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          1. ABOUT THIS POLICY
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          1.1 This Policy describes how CV Cloud Processes information we
          collect and/or receive from you.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          1.2 CV Cloud is a sole proprietorship; with its primary place of
          business at 3 Halitestreet, Carletonville.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          1.3 CV Cloud is a “Responsible Party”. This means that we are
          responsible for deciding how we hold and use Personal Information
          about you. We are required under data protection legislation to notify
          you of the information contained in this Privacy Policy.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          1.4 This Policy applies to all Data Subjects who visit this Website
          and all Data Subjects who CV Cloud Processes their Personal
          Information.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          2. DEFINITIONS
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          2.1. For purposes of this Policy:
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          2.1.1 “CV Cloud”, “Us” or “We” means CV Cloud;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          2.1.2 “Data Subject” or “You” means any person to whom the specific
          Personal Information relates, as contemplated in POPIA;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          2.1.3 “IO” means the Information Officer of CV Cloud;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          2.1.4 “Personal Information” means information relating to an
          identifiable, living, natural person, and (where applicable) an
          identifiable, existing juristic person, including the name, race,
          gender, marital status, address and identifying number of a person,
          symbol, e-mail address, physical address, telephone number, location
          information, online identifier or other particular assignment to the
          person;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          2.1.5 “Policy” or “Privacy Policy” means this Website Privacy Policy;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          2.1.6 “POPIA” means the Protection of Personal Information, of 2013;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          2.1.7 “Processing” or “Process” means any activity that involves the
          use of Personal Information. It includes any operation or activity or
          any set of operations, whether or not by automatic means, concerning
          Personal Information, including:
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          2.1.7.1 the collection, receipt, recording, organisation, collation,
          storage, updating or modification, retrieval, alteration, consultation
          or use;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          2.1.7.2 dissemination by means of transmission, distribution or making
          available in any other form; or
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          2.1.7.3 merging, linking, as well as restriction, degradation, erasure
          or destruction of information;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          2.1.8 “Special personal information” means personal information
          concerning the religious or philosophical beliefs, race or ethnic
          origin, trade union membership, political persuasion, health or sex
          life or biometric information of a data subject; or the criminal
          behaviour of a data subject to the extent that such information
          relates to the alleged commission by a data subject of any offence; or
          any proceedings in respect of any offence allegedly committed by a
          data subject or the disposal of such proceedings;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          2.1.9 “Social Media Platforms” means platforms such as Facebook,
          LinkedIn, Twitter, Pinterest, YouTube, Instagram, WeChat, WhatsApp,
          TikTok, blogs and all other similar Social Media or communication
          platforms; and
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          2.1.10 “Website” means CV Cloud’s website and mobile application
          www.cvcloud.app
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3. INFORMATION WE COLLECT AND RECEIVE
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          We collect and receive information about you in the following ways:
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.1 Information you give us
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          This includes any information that you provide to us directly:
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.1.1 when you sign-up to use our services;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.1.2 by filling in forms on our websites, or those provided to you;
          or
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.1.3 when you contact us or we contact you and you provide
          information directly to us.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.2 Personal Information we collect.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.2.1 When you register to use our services, you will be required to
          provide us with the following information, your:
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.2.1.1 name and surname; and
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.2.1.2 email address.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.2.2 We will also collect the Personal Information which you upload
          onto your profile when building your CV, this will include (without
          limitation):
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.2.2.1 contact details;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.2.2.2 physical address;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.2.2.3 education and job history;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.2.2.4 race information; and/or
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.2.2.5 health information.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.2.3 By submitting the above information to us when preparing your CV
          you hereby consent to us collecting and otherwise Processing such
          Personal Information and Special Personal Information.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.3 Information we collect or receive when you use our Website.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          We collect information when you use Websites by using cookies, web
          beacons and other technologies. Depending on how you access and use
          websites, we may receive:
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.3.1 log information;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.3.2 information we infer about you based on your interaction with
          products and services;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.3.3 device information (for example the type of device you're using,
          how you access platforms, your browser or operating system and your
          Internet Protocol ("IP") address); and
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          3.3.4 location information.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          4. HOW WE USE THE INFORMATION WE COLLECT AND RECEIVE.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          We use the information we collect and receive for the following
          general purposes:
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          4.1 to provide you with information, products or services you request
          from us;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          4.2 in order to refer you to an appropriate third-party service
          provider;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          4.3 to communicate with you;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          4.4 to provide you with support; and
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          4.5 to provide effective advertising (for example to be provide you
          with news, special offers and general information about other goods,
          services and events which we offer, that are similar to those that you
          have already enquired about).
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          5 HOW WE SHARE THE INFORMATION WE COLLECT AND RECEIVE.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          5.1 We don’t sell your Personal Information to third parties for their
          marketing purposes.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          5.2 We may share information with:
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          5.2.1 our affiliates, in other words, other companies in our group;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          5.2.2 we may disclose your Personal Information to a limited number of
          our employees and third party service providers (other than those who
          we refer you to), who we assist you to interact with;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          5.2.3 other parties in response to legal process or when necessary to
          conduct or protect our legal rights;
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          5.2.4 companies that provide services to us. Companies that provide
          services to us or act on our behalf may have access to information
          about you. These companies are limited in their ability to use
          information they receive in the course of providing services to us or
          you; and
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          5.2.5 third-parties where you provide consent. In some cases,
          third-parties (often advertisers) may wish to attain information about
          you in order to promote their products to you, or for whatever other
          reason. We may share information with third-parties where you provide
          consent in the form of an explicit opt-in. Before we ask you to
          opt-in, we will endeavour to provide you with a clear description of
          what data would be shared with the third-party. Remember that once you
          have opted in to allow us to send your information to the third-party,
          we cannot control what they do with your data; therefore, be sure to
          investigate their privacy policies before providing permission for us
          to share your information.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          6 YOUR RIGHTS.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          6.1 You have the right to ask us not to contact you for marketing
          purposes. You can exercise this right at any time by using any of the
          various "opt-out" options that we will always provide to you when we
          communicate with you. We won’t send you marketing messages if you tell
          us not to but we will still need to send you service-related messages.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          6.2 Our website use cookies. If you wish to reject our cookies, you
          can configure your browser to do so.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          6.3 We want to make sure that any data we hold about you is up to
          date. So, if you think your Personal Information is inaccurate, you
          can ask us to correct or remove it.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          7 RETENTION OF DATA.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          We will retain your Personal Information only for as long as is
          necessary for the purposes set out in this privacy policy or to comply
          with our legal obligations, resolve disputes, and enforce our legal
          agreements and policies.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          8 OUR COMMITMENT TO SECURITY.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          The security of your data is important to us. While we strive to use
          commercially acceptable means to protect your Personal Information, we
          cannot guarantee its absolute security. However, we do employ a number
          of safeguards intended to mitigate the risk of unauthorised access or
          disclosure of your information. We will do our best to protect your
          Personal Information and we will use up to date technology that will
          help us to do this. We will at all times comply with our obligation
          under applicable law.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          9 TRANSFER OF DATA.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          9.1 We are based in and operate from South Africa. Your information,
          including Personal Information, may be transferred to and maintained
          on servers located outside of your country of residence, where the
          data privacy laws, regulations and standards, may not be equivalent to
          the laws in your country of residence.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          9.2 We might transfer your Personal Information to places outside of
          South Africa and store it there, where our suppliers might Process it.
          If that happens, your Personal Information will only be transferred to
          and stored in country that has equivalent, or better, data protection
          legislation than South Africa or with a service provider which is
          subject to an agreement requiring it to comply with data protection
          requirements equivalent or better than those applicable in South
          Africa.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          9.3 Your use of our Website, followed by your submission of
          information to us, represents your consent to such transfer.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          9.4 We will take all steps reasonably necessary to ensure that your
          data is treated securely and in accordance with this Policy.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          10 LINKS TO OTHER WEBSITES.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          Our Website or Social Media platforms may contain links to and from
          websites, mobile applications or services of third parties,
          advertisers or affiliates. Please note that we are not responsible for
          the privacy practices of such other parties and advise you to read the
          privacy statements of each website you visit which collects Personal
          Information.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          11 CHANGES TO THIS PRIVACY POLICY.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          We may update this Privacy Policy from time to time. Any changes that
          we may make to our privacy policy will be posted on our website and
          will be effective from the date of posting.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          12 ACCESS TO, CORRECTION AND DELETION OF YOUR PERSONAL INFORMATION.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          12.1 You may request details of Personal Information which we hold
          about you under the Promotion of Access to Information Act, 2000
          (“PAIA”). Fees to obtain a copy or a description of Personal
          Information held about you are prescribed in terms of PAIA.
          Confirmation of whether or not we hold Personal Information about you
          may be requested free of charge.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          12.2 You may request the correction of Personal Information CV Cloud
          holds about you. Please ensure that the information we hold about you
          is complete, accurate and up to date. If you fail to keep your
          information updated, or if your information is incorrect, CV Cloud may
          limit the products and services offered to you or elect not to open
          the account.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          12.3 You have a right in certain circumstances to request the
          destruction or deletion of and, where applicable, to obtain
          restriction on the Processing of Personal Information held about you.
          If you wish to exercise this right, please contact us using the
          contact details set out below in clause 14..
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          12.4 You have a right to object on reasonable grounds to the
          Processing of your Personal Information where the Processing is
          carried out in order to protect our legitimate interests or your
          legitimate interests, unless the law provides for such Processing.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          13 COMPLAINTS.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          13.1 Should you believe that CV Cloud has utilised your Personal
          Information contrary to Applicable Laws, you undertake to first
          attempt to resolve any concerns with us.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          13.2 If you are not satisfied with such process, you may have the
          right to lodge a complaint with the Information Regulator, using the
          contact details listed below:
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          E-mail address: complaints.IR@justice.gov.za
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          Physical address: JD House 27, Stiemens Street, Braamfontein,
          Johannesburg, 2001
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          14 IO CONTACT DETAILS.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          If you have any comments or questions about this Statement or how we
          handle your Personal Information, please contact the Information
          Officer.
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          IO Name: Nico Rapelas
        </Text>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          E-mail address: nicorapelas@gmail.com
        </Text>
        {!privacyChecked || !termsChecked ? null : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              buildCV()
              acceptTermsAndConditions(privacyChecked, () => fetchUser())
            }}
          >
            <Text style={styles.buttonText}>continue</Text>
          </TouchableOpacity>
        )}
        <CheckBox
          onPress={() => setPrivacyChecked(!privacyChecked)}
          title="I accept CV Cloud Privacy Policy"
          iconRight
          checked={privacyChecked}
          textStyle={styles.checkText}
          containerStyle={styles.checkBed}
        />
        <CheckBox
          onPress={() => setTermsChecked(!termsChecked)}
          title="I accept CV Cloud Terms of Use"
          iconRight
          checked={termsChecked}
          textStyle={styles.checkText}
          containerStyle={styles.checkBed}
        />
      </ScrollView>
    )
  }
  return renderContent()
}

const styles = StyleSheet.create({
  heading: {
    color: '#F9B321',
    fontSize: 14,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10,
  },
  messageTextIos: {
    color: '#F9B321',
    fontWeight: '100',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  messageTextAndroid: {
    color: '#F9B321',
    fontFamily: 'sourceSansProLight',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  checkBed: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    borderColor: 'rgba(0, 0, 0, 1)',
    alignSelf: 'center',
  },
  checkText: {
    color: '#ffff',
  },
  button: {
    backgroundColor: '#278acd',
    borderRadius: 5,
    alignSelf: 'center',
    width: 'auto',
    marginVertical: 10,
  },
  buttonText: {
    color: '#ffff',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
})

export default TermsAndConditions
